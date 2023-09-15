import AWS from 'aws-sdk';

const getAwsSsm = async (paramStorePath) => {

    // Setup AWS SSM client
    const ssm = new AWS.SSM({
        endpoint: process.env.LOCALSTAK_HOST_URI ? `http://${process.env.LOCALSTAK_HOST_URI}:4566` : undefined
    })

    // Get parameters by path. This will return a maximum of 
    // 10 parameters per call, a recursive function will 
    // be needed to get all parameters
    const getParametersByPath = async (results: any[], nextToken?: string, count = 0): Promise<any> => {
        
        // Get parameters by path using the next token if it exists
        const params = await ssm.getParametersByPath({
            Path: `/?${paramStorePath}/`,
            NextToken: nextToken
        }).promise();

        // Add parameters to result array
        const output = [...results, ...(params.Parameters || [])];

        // If there is no more tokens return the output
        if (!params.NextToken) return output;

        // If the count is greater than 10 throw an error
        if (count >= 10) throw new Error('Too many parameters');

        // If there is a next token, recursively call this function
        return getParametersByPath(output, params.NextToken, count + 1);
    }

}

const ssmEnvironment = (cache) => async (request) => {
    if (!cache || !cache.env || !cache.envExpireDate || cache.envExpiryDate >= Date.now()) {
        const env = await getAwsSsm(process.env.PRARM_STORE_PATH);
        const envExpireDate = Date.now() + 20000;
        
        Object.assign(cache, { env, envExpireDate });
    } else {
        
    }
    Object.assign(request.context, {ssm: {env: cache.env}})
}

export {ssmEnvironment}