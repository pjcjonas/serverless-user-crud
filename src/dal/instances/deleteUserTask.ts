import { Sequelize } from "sequelize";
import { models } from '../models'
import { DeleteTaskSchema } from "../../handlers/schemas/taskSchema";


export const deleteUserTaskInstance = (connections: Sequelize) => async (task: DeleteTaskSchema) => {
    try {
        const deleteUserInstance = await models(connections).Task.destroy({
            where:{
                taskUuid: task.taskUuid,
                userUuid: task.userUuid
            }
        });
        return deleteUserInstance;
    } catch (error) {
        console.log("error fokking error:".repeat(100), error, "error fokking error:".repeat(100));
    }
}