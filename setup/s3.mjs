import { S3 } from "@aws-sdk/client-s3";

const run = async (env) => {
    console.log(env);
    const s3 = new S3({
        endpoint: 'http://127.0.0.1:4566',
        region: 'eu-west-1',
        accessKeyId: 'x',
        secretAccessKey: 'x',
        s3ForcePathStyle: true,
    });

    const buckets = await s3.listBuckets({});
    if (buckets.Buckets.find(bucket => bucket.Name === env['/sls-stack-user/DEPLOYMENT_BUCKET'])) {
        console.log('Bucket already exists');
        return;
    }

    console.log(`Creating ${env['/sls-stack-user/DEPLOYMENT_BUCKET']}`);

    const result = await s3.createBucket({ Bucket: env['/sls-stack-user/DEPLOYMENT_BUCKET']});
    console.log(result);
}

export { run }