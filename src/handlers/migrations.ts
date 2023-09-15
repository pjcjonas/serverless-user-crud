import { migrationDown, migrationUp } from "../dal/migrations";
import { getParameterStoreValues } from "../helpers/parameterStoreValues"

let cache: any = {
    expiry: undefined,
    env:{
        DB_NAME: process.env.DB_NAME ?? '',
        DB_USER: process.env.DB_USER ?? '',
        DB_PASS: process.env.DB_PASS ?? '',
        DB_HOST: process.env.DB_HOST ?? '',
        DB_PORT: Number(process.env.DB_PORT) ?? 3306,
        DB_DIALECT: process.env.DB_DIALECT,
    }
}



export const up = async () => {
    cache = await getParameterStoreValues(cache);
    await migrationUp(cache);
}

export const down = async () => {
    cache = await getParameterStoreValues(cache);
    await migrationDown(cache);
}