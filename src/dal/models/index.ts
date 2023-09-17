import { Sequelize } from "sequelize";
import { UserModel } from "./user";

export const models = (connection: Sequelize) => {
    const User = UserModel(connection);
    return{
        User
    }
}