import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { UpdatedUserSchema, updateUserSchema } from './schemas/userSchema'
import { responseBadRequest, responseNoContent, responseServerError, responseSuccess } from '../helpers/httpResponse'
import { cachedDbConnection } from "../dal"
import { getUserInstance } from '../dal/instances/getUser'
import { updateUserInstance } from '../dal/instances/updateUser'
import { UpdatedTaskSchema, updatedTaskSchema } from './schemas/taskSchema'
import { updateTaskInstance } from '../dal/instances/updateUserTask'
import { getTaskInfoInstance } from '../dal/instances/getTaskInfo'
import { Task } from '../dal/models/tasks'

let cache: any = {
    expiry: undefined,
    env:{
        DB_DATABASE: process.env.DB_DATABASE ?? '',
        DB_USERNAME: process.env.DB_USERNAME ?? '',
        DB_PASSWORD: process.env.DB_PASSWORD ?? '',
        DB_HOST: process.env.DB_HOST ?? '',
        DB_PORT: Number(process.env.DB_PORT) ?? 3306,
        DB_DIALECT: process.env.DB_DIALECT,
    },
    db: undefined
}

/**
 * PUT /users/{user_id}/tasks/{task_id}
 * @summary Update user task name
 * @tags UserAPI
 * @param {UpdatedTaskSchema} request.body.required
 */
const handler: middy.MiddyfiedHandler = middy(async (event: APIGatewayProxyEvent, context: any) => {

    // Parse the request body from the event
    const body = updatedTaskSchema.safeParse(event.body);

    // If the body is not valid, return a 400 Bad Request response
    if (!body.success) {
        return responseBadRequest();
    }

    const task: UpdatedTaskSchema = body.data;

    // Get the cached DB connection
    cache = await cachedDbConnection(cache)

    try {
        
        if (event.pathParameters?.user_id && event.pathParameters?.task_id) {
            const checkTask = await getTaskInfoInstance(cache.db)(
                event.pathParameters?.user_id,
                event.pathParameters?.task_id
            );

            if (!checkTask) return responseBadRequest({message: 'Task does not exist'});

            const updatedTask = await updateTaskInstance(cache.db)(
                task.taskName,
                event.pathParameters?.user_id,
                event.pathParameters?.task_id
            )

            return responseSuccess(updatedTask as Task);
        } else {
            return responseBadRequest();
        }

    } catch (error) {
        return responseServerError(error);
    }
})

handler
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser())
  .use(httpErrorHandler())

export { handler }