import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { createUserSchema } from './schemas/userSchema'
import { responseBadRequest, responseServerError, responseSuccess } from '../helpers/httpResponse'
import { User, UserAttributes } from '../dal/models/user'
import { v4 as uuidv4 } from 'uuid';
import { models } from '../dal/models'
import { createUserInstance } from '../dal/instances/createUser'
import {connect} from "../dal"

let cache: any = {
    expiry: undefined,
    env:{
        DB_DATABASE: process.env.DB_DATABASE ?? '',
        DB_USERNAME: process.env.DB_USERNAME ?? '',
        DB_PASSWORD: process.env.DB_PASSWORD ?? '',
        DB_HOST: process.env.DB_HOST ?? '',
        DB_PORT: Number(process.env.DB_PORT) ?? 3306,
        DB_DIALECT: process.env.DB_DIALECT,
    }
}

// aws handler to return hello world with typescript and middy
const handler: middy.MiddyfiedHandler = middy(async (event: APIGatewayProxyEvent, context: any) => {

    // Parse the request body from the event
    const body = createUserSchema.safeParse(event.body);
    // If the body is not valid, return a 400 Bad Request response
    if (!body.success) {
        return responseBadRequest();
    }

    try {
        console.log("~~: cache.env: ".repeat(200), cache.env , "~~".repeat(200))
        console.log("~~: process.env: ".repeat(200), process.env , "~~".repeat(200))

        const connection = await connect(cache.env)
        const userInstance = await createUserInstance(connection)({
            userUuid: uuidv4(),
            firstName: body.data.firstName,
            lastName: body.data.lastName,
            email: body.data.email
        })
        return responseSuccess(userInstance);
    } catch (error) {
        console.log("~~~~".repeat(100), error, "~~~~".repeat(100))
        return responseServerError(error);
    }
})

handler
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser())
  .use(httpErrorHandler())

export { handler }