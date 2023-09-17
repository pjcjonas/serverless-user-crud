import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { responseBadRequest, responseNotFound, responseServerError, responseSuccess } from '../helpers/httpResponse'
import { cachedDbConnection } from '../dal'
import { getUserInstance } from '../dal/instances/getUser'

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
 * GET /users/{user_id}
 * @summary Get user by User UUID
 * @tags UserAPI
 * @param {string} event.path.user_id.required
 * @returns {User} 200 - User object
 */
const handler: middy.MiddyfiedHandler = middy(async (event: APIGatewayProxyEvent, context: any) => {
    try {
        cache = await cachedDbConnection(cache)
        if (event.pathParameters?.user_id) {
            const userInstance = await getUserInstance(cache.db)({
                userUuid: event.pathParameters?.user_id
            })
            
            if (!userInstance) return responseNotFound();

            return responseSuccess({...userInstance});
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