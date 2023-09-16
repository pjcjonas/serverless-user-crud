import {APIGatewayProxyResult} from 'aws-lambda';
import kebabcaseKeys from 'kebabcase-keys';

// Create a response body from an object
export const createResponseBody = (body?: any): string => {
    if (!body) return ''
    if (typeof body === 'string') return body
    return JSON.stringify(kebabcaseKeys(body, { deep: true }))
}

// Create a success response
export const SuccessResponse = (statuscode: number) => (body?: object): APIGatewayProxyResult => {
    return {
        statusCode: statuscode,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    }
}

// Create an error response
export const ErrorResponse = (statuscode: number) => (body?: object): APIGatewayProxyResult => {
    const defaultResponseBody = {
        status: statuscode,
        title: 'Internal Server Error',
        type: 'about:blank',
        instance: '/taskmanager',
        detail: 'Internal Server Error',
    }

    return {
        statusCode: statuscode,
        headers: {
            'Content-Type': 'application/problem+json',
        },
        body: createResponseBody({
            ...defaultResponseBody,
            ...body,
        }),
    }
}

export const responseSuccess = SuccessResponse(200);
export const responseAccepted = SuccessResponse(202);
export const responseNoContent = SuccessResponse(204);
export const responseBadRequest = ErrorResponse(400);
export const responseNotFound = ErrorResponse(404);
export const responseServerError = ErrorResponse(500);