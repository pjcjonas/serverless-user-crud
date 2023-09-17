import { Sequelize } from "sequelize";
import { models } from '../models'
import { Task } from "../models/tasks";


export const getTaskInfoInstance = (connections: Sequelize) => async (userUuid: string, taskUuid: string) => {
    const task: Task = await models(connections).Task.findOne({
        where: {
            userUuid: userUuid,
            taskUuid: taskUuid,
        }
    }) as Task;
    return task
}