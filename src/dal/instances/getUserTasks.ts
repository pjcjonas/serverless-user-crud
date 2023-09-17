import { Sequelize } from "sequelize";
import { models } from '../models'
import { Task } from "../models/tasks";


export const getUsersTasksInstance = (connections: Sequelize) => async (userUuid: string) => {
    const tasks: Task[] = await models(connections).Task.findAll({
        where: {
            userUuid: userUuid
        }
    })
    return tasks
}