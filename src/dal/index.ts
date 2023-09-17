import { Sequelize } from "sequelize";
import mysql2 from 'mysql2'

export const connect = (env: any): Sequelize => {
    const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD,{
        host: env.DB_HOST,
        port: Number(env.DB_PORT) || 3306,
        dialect: "mysql",
        dialectModule: env.DB_DIALECT === "mysql" ? mysql2: undefined
    });
    console.log("connect".repeat(200), env , "connect".repeat(200))
    return sequelize;
}

export const cachedDbConnection = (cache: any) => {
    if (cache.dbConnection) return cache
    return {
      ...cache,
      db: connect(cache.env),
    }
  }

