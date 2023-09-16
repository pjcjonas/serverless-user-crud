import { Sequelize } from "sequelize";
import { UserAttributes } from '../models/user'
import { models } from '../models'
import { v4 as uuidv4 } from 'uuid';


export const createUserInstance = (connections: Sequelize) => async (user: UserAttributes) => {
    const createUserInstance = await models(connections).User.create({
        userUuid: uuidv4(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
    return {createUserInstance}
}