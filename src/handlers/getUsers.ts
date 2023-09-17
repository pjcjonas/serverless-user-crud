import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { responseServerError, responseSuccess } from '../helpers/httpResponse'
import { cachedDbConnection } from '../dal'
import { getUsersInstance } from '../dal/instances/getUsers'

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
 * GET /users
 * @summary Get all users
 * @tags UserAPI
 * @returns {User[]} 200 - User object array
 */
const handler: middy.MiddyfiedHandler = middy(async (event: APIGatewayProxyEvent, context: any) => {
    try {
        cache = await cachedDbConnection(cache)
        const users = await getUsersInstance(cache.db)()
        return responseSuccess({user: users});
        
    } catch (error) {
        return responseServerError(error)
    }
})

handler
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser())
  .use(httpErrorHandler())

export { handler }