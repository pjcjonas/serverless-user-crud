import AWS from 'aws-sdk'


const run = async (env) => {
    const ssmEnv = Object.entries(env).filter(([x]) => x.startsWith('/'))
    const ssm = new AWS.SSM({
        endpoint: 'http://localhost:4566',
        region: "eu-west-1",
        accessKeyId: 'x',
        secretAccessKey: 'x',
    });

    for (const [name, value] of ssmEnv) {
        const type = value.includes(',') ? 'StringList' : 'String'
        await ssm.putParameter({
            Name: name,
            Value: value,
            Type: type,
            Overwrite: true,
        }).promise().then((x) => console.log(x.$response));
    }

    console.log("Updating SSM parameters complete");

    let nextToken = undefined;

    do {
        const result = await ssm.getParametersByPath({
            Path: "/", Recursive: true, NextToken: nextToken
        });
        result.Parameters?.map(({ Name }) => ({ Name })).forEach((x) => console.log(x))
        nextToken = result.NextToken;
    } while (nextToken);
}

export {run}