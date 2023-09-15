import AWS from 'aws-sdk'

const run = async (env) => {
  const s3 = new AWS.S3({
    endpoint: 'http://localhost:4566',
    region: "eu-west-1",
    accessKeyId: 'x',
    secretAccessKey: 'x',
    s3ForcePathStyle: true,
  })

  const buckets = await s3.listBuckets().promise()
  if (buckets.Buckets?.find((x) => x.Name === env['/sls-stack-user/DEPLOYMENT_BUCKET'])) {
    return
  }


  const result = await s3
    .createBucket({ Bucket: env['/sls-stack-user/DEPLOYMENT_BUCKET'] })
    .promise()
}

export { run }
