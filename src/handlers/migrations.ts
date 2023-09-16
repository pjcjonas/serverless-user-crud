import { migrationDown, migrationUp } from "../dal/migrations";
import { getParameterStoreValues } from "../helpers/parameterStoreValues"

let cache: any = {
    expiry: undefined,
    env:{
        DB_DATABASE: process.env.DB_DATABASE ?? '',
        DB_USERNAME: process.env.DB_USERNAME ?? '',
        DB_PASSWORD: process.env.DB_PASSWORD ?? '',
        DB_HOST: process.env.DB_HOST ?? '',
        DB_PORT: Number(process.env.DB_PORT) ?? 3306,
        DB_DIALECT: process.env.DB_DIALECT,
    }
}

export const up = async () => {
    cache = await getParameterStoreValues(cache);
    console.log("cache: ".repeat(100), cache.env);
    await migrationUp(cache.env);
}

export const down = async () => {
    cache = await getParameterStoreValues(cache);
    console.log("cache: ".repeat(100), cache.env);
    await migrationDown(cache.env);
}