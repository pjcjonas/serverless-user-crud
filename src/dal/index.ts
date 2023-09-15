import { Sequelize } from "sequelize";

const connect = (env: any): Sequelize => {
    const sequelize = new Sequelize({
        dialect: "mysql",
        host: env.DB_HOST,
        port: env.DB_PORT,
        database: env.DB_DATABASE,
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        logging: false
    });

    return sequelize;
}

export {connect}

