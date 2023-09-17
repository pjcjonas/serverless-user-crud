import { Sequelize } from "sequelize";
import { models } from '../models'
import { UpdatedTaskSchema } from "../../handlers/schemas/taskSchema";
import { Task } from "../models/tasks";


export const updateTaskInstance = (connections: Sequelize) => async (taskName: string, userUuid: string, taskUuid: string) => {
    await models(connections).Task.update({
            taskName: taskName
        },  
        {
            where: { userUuid: userUuid, taskUuid: taskUuid }
        }
    )

    const updatedTask = await models(connections).Task.findOne({
        where: {
            userUuid: userUuid,
            taskUuid: taskUuid
        }
    });

    return updatedTask
}
