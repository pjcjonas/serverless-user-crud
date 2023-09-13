import { readFile } from 'fs/promises'
import { run as ssm } from './ssm.mjs'
import { run as s3 } from './s3.mjs'

const parseEnv = (envFile) => {
  return envFile
    .split('\n')
    .filter((x) => x)
    .filter((x) => !x.startsWith('#'))
    .filter((x) => x.includes('='))
    .map((x) => x.split('='))
    .reduce((a, [name, value]) => ({ ...a, [name]: value }), {})
}

const envFile = await readFile('.env.local', 'utf8')
const env = parseEnv(envFile)

await ssm(env)
await s3(env)
