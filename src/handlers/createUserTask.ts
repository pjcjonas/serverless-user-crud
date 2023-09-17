import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { CreateUserSchema, createUserSchema } from './schemas/userSchema'
import { createTaskSchema, CreateTaskSchema } from './schemas/taskSchema'
import { responseBadRequest, responseNotFound, responseServerError, responseSuccess } from '../helpers/httpResponse'
import { v4 as uuidv4 } from 'uuid';
import { createUserInstance } from '../dal/instances/createUser'
import {cachedDbConnection} from "../dal"
import { getUserInstance } from '../dal/instances/getUser'
import { createUserTaskInstance } from '../dal/instances/createUserTask'

let cache: any = {
    expiry: undefined,
    env:{
        DB_DATABASE: process.env.DB_DATABASE ?? '',
        DB_USERNAME: process.env.DB_USERNAME ?? '',
        DB_PASSWORD: process.env.DB_PASSWORD ?? '',
        DB_HOST: process.env.DB_HOST ?? '',
        DB_PORT: Number(process.env.DB_PORT) ?? 3306
    },
    db: undefined
}

/**
 * POST /users/{user_id}/tasks
 * @summary Create a new user
 * @tags UserAPI
 * @param {CreateUserSchema} request.body.required
 */
const handler: middy.MiddyfiedHandler = middy(async (event: APIGatewayProxyEvent, context: any) => {
    const body = createTaskSchema.safeParse(event.body);
    if (!body.success) return responseBadRequest();

    try {
        cache = await cachedDbConnection(cache)
        if (event.pathParameters?.user_id) {
            const userTask = await createUserTaskInstance(cache.db)({
                taskUuid: uuidv4(),
                userUuid: event.pathParameters?.user_id,
                taskName: body.data.taskName,
                taskDate: body.data.taskDate,
                taskDescription: body.data.taskDescription
            });

            return responseSuccess(userTask);
        } else {
            return responseBadRequest();
        }

    } catch (error) {
        return responseServerError(error)
    }
})

handler
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser())
  .use(httpErrorHandler())

export { handler }