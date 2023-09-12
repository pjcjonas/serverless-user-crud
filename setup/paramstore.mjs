import { SSM } from "@aws-sdk/client-ssm"


const run = async (env) => {
    const ssm = new SSM({
        endpoint: 'http://127.0.0.1:4566',
        region: 'eu-west-1',
        accessKeyId: 'x',
        secretAccessKey: 'x',
    });

    for (const [name, value] of Object.entries(env)) {
        console.log(`Setting ${name} to ${value}`);
        await ssm.putParameter({
            Name: name,
            Value: value,
            Type: 'String',
            Overwrite: true,
        });
    }

    console.log("Updating SSM parameters complete");

    let nextToken = undefined;

    do {
        const result = await ssm.getParametersByPath({
            Path: "/", Recursive: true, NextToken: nextToken
        });
        console.log("Parameters:", result);
        nextToken = result.NextToken;
    } while (nextToken);
}

export {run}