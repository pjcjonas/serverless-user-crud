import { Sequelize } from "sequelize";
import { models } from '../models'
import { TaskAttributes } from "../models/tasks";


export const createUserTaskInstance = (connections: Sequelize) => async (task: TaskAttributes) => {
    try {
        const createUserTaskInstance = await models(connections).Task.create({
            taskUuid: task.taskUuid,
            userUuid: task.userUuid,
            taskDescription: task.taskDescription,
            taskName: task.taskName,
            taskDate: task.taskDate
        });
        return createUserTaskInstance;
    } catch (error) {
        console.log("error fokking error:".repeat(100), error, "error fokking error:".repeat(100));
    }
}