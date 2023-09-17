import { Sequelize } from "sequelize";
import { models } from '../models'
import { UserAttributes } from "../models/user";


export const updateUserInstance = (connections: Sequelize) => async (user: UserAttributes) => {
    const exisitingUser = await models(connections).User.findOne({where: {userUuid: user.userUuid}});
    const userInstance = await models(connections).User.update({
            email: user.email || exisitingUser?.email,
            firstName: user.firstName || exisitingUser?.firstName,
            lastName: user.lastName || exisitingUser?.lastName
        },
        {
            where: { userUuid: user.userUuid }
        }
    )
    return userInstance
}
