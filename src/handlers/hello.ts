import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import { SQSEvent } from 'aws-lambda'

// aws handler to return hello world with typescript and middy
const handler: middy.MiddyfiedHandler = middy(async (event: SQSEvent, context: any) => {
    return {
        "hello": "world"
    }
})

handler.use(httpErrorHandler())

export { handler }