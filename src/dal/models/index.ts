import { Sequelize } from "sequelize";
import { UserModel } from "./user";
import { TaskModel } from "./tasks";

export const models = (connection: Sequelize) => {
    const User = UserModel(connection);
    const Task = TaskModel(connection);
    return{
        User,
        Task
    }
}