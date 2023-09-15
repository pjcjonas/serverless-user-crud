import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { ssmEnvironment } from '../middleware/ssm'

const cache = {}

// aws handler to return hello world with typescript and middy
const handler: middy.MiddyfiedHandler = middy(async (event: APIGatewayProxyEvent, context: any) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello World!',
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }
})

handler
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser())
  .use(httpErrorHandler())
  .before(ssmEnvironment(cache))

export { handler }