import {readFile} from 'fs/promises';
import {run as s3} from './s3.mjs';
import {run as ssm} from './paramstore.mjs';


const parseEnv = async (envFile) => {
    return envFile
        .split('\n')
        .filter((x) => x)
        .filter((x) => !x.startsWith('#'))
        .filter((x) => x.includes('='))
        .map((x) => x.split('='))
        .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
}

const envFile = await readFile('./.env.local', 'utf-8');
const env = await parseEnv(envFile);

ssm(env);
s3(env);