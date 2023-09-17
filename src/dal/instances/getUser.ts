import { Sequelize } from "sequelize";
import { models } from '../models'


export const getUserInstance = (connections: Sequelize) => async (getWhere: any) => {
    const userInstance = await models(connections).User.findOne({
        where: getWhere
    })
    return userInstance
}
