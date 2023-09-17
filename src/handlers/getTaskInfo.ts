import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { responseBadRequest, responseNotFound, responseServerError, responseSuccess } from '../helpers/httpResponse'
import { cachedDbConnection } from '../dal'
import { getTaskInfoInstance } from '../dal/instances/getTaskInfo'

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
 * GET /users/{user_id}/tasks/{task_id}
 * @summary Get task by User UUID and Task UUID
 * @tags TaskAPI
 * @param {string} event.path.user_id.required
 * @returns {Task} 200 - Task object
 */
const handler: middy.MiddyfiedHandler = middy(async (event: APIGatewayProxyEvent, context: any) => {
    try {
        cache = await cachedDbConnection(cache)
        if (event.pathParameters?.user_id && event.pathParameters?.task_id) {
            const task = await getTaskInfoInstance(cache.db)(
                event.pathParameters?.user_id,
                event.pathParameters?.task_id
            )
            
            if (!task) return responseNotFound();

            return responseSuccess(task);
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