import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { responseBadRequest, responseNoContent, responseServerError} from '../helpers/httpResponse'
import {cachedDbConnection} from "../dal"
import { deleteUserTaskInstance } from '../dal/instances/deleteUserTask'

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
 * DELETE /users/{user_id}/tasks/{task_id}
 * @summary Create a new user
 * @tags UserAPI
 * @param {DeleteTaskSchema} request.body.required
 */
const handler: middy.MiddyfiedHandler = middy(async (event: APIGatewayProxyEvent, context: any) => {
    try {
        cache = await cachedDbConnection(cache)
        if (event.pathParameters?.user_id && event.pathParameters?.task_id) {
            await deleteUserTaskInstance(cache.db)({
                taskUuid: event.pathParameters.task_id,
                userUuid: event.pathParameters.user_id
            });

            return responseNoContent();
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