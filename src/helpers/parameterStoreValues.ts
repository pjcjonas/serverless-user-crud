import { SSM } from 'aws-sdk'
const ssm = new SSM()

export const parameterStorePath = process.env.PARAMETER_STORE_PATH || ''
export const parameterStoreExpiryInMs = process.env.PARAMETER_STORE_EXPIRY_IN_MS || 180000

const getParamsByPath = async (results?: any[], nextToken?: string, count = 0): Promise<any> => {
    const parameters = await ssm
    .getParametersByPath({ Path: `${parameterStorePath}/`, NextToken: nextToken })
    .promise()
    const output = [...(results || []), ...(parameters.Parameters || [])]
    if (!parameters.NextToken) return output
    if (count >= 10) throw new Error('failed to retrieve all items from parameter store')
    return getParamsByPath(output, parameters.NextToken, count + 1)
}

export const getParameterStoreValues = async (cache: any = {}) => {
    if (process.env.IS_OFFLINE) {
      return cache
    }
  
    if (cache.expiry && Date.now() < cache.expiry + parameterStoreExpiryInMs) {
      return cache
    }
  
    const parameters = await getParamsByPath()
  
    
    return {
      ...cache,
      expiry: Date.now(),
      env: {
        ...cache.env,
        ...parameters.reduce(
          (a: any, c: any) => ({ ...a, [c.Name.replace(`${parameterStorePath}/`, '')]: c.Value }),
          {},
        ),
      },
    }
  }