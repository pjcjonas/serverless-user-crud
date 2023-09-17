import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { CreateUserSchema, createUserSchema } from './schemas/userSchema'
import { responseBadRequest, responseServerError, responseSuccess } from '../helpers/httpResponse'
import { v4 as uuidv4 } from 'uuid';
import { createUserInstance } from '../dal/instances/createUser'
import {cachedDbConnection} from "../dal"
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
 * POST /users
 * @summary Create a new user
 * @tags UserAPI
 * @param {CreateUserSchema} request.body.required
 */
const handler: middy.MiddyfiedHandler = middy(async (event: APIGatewayProxyEvent, context: any) => {
    const body = createUserSchema.safeParse(event.body);
    if (!body.success) {
        return responseBadRequest();
    }

    const user: CreateUserSchema = body.data;
    cache = await cachedDbConnection(cache)

    try {

        const checkUser = await getUserInstance(cache.db)({
            email: user.email
        })

        if (checkUser) return responseBadRequest({message: 'User already exists'});
        
        const userInstance = await createUserInstance(cache.db)({
            userUuid: uuidv4(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        })
        return responseSuccess({user: userInstance});
    } catch (error) {
        return responseServerError(error);
    }
})

handler
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser())
  .use(httpErrorHandler())

export { handler }