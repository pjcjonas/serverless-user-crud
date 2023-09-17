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
 * PUT /users/{user_id}
 * @summary Update existing user
 * @tags UserAPI
 * @param {UpdateUserSchema} request.body.required
 */
const handler: middy.MiddyfiedHandler = middy(async (event: APIGatewayProxyEvent, context: any) => {

    // Parse the request body from the event
    const body = updateUserSchema.safeParse(event.body);

    // If the body is not valid, return a 400 Bad Request response
    if (!body.success) {
        return responseBadRequest();
    }

    const user: UpdatedUserSchema = body.data;

    // Get the cached DB connection
    cache = await cachedDbConnection(cache)

    try {
        
        const checkUser = await getUserInstance(cache.db)({
            userUuid: event.pathParameters?.user_id
        })

        if (!checkUser) return responseBadRequest({message: 'User does not exist'});
        
        await updateUserInstance(cache.db)({
            userUuid: event.pathParameters?.user_id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        })
        return responseNoContent();
    } catch (error) {
        return responseServerError(error);
    }
})

handler
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser())
  .use(httpErrorHandler())

export { handler }