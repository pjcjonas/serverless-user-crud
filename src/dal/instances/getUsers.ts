import { Sequelize } from "sequelize";
import { User } from '../models/user'
import { models } from '../models'


export const getUsersInstance = (connections: Sequelize) => async () => {
    const users: User[] = await models(connections).User.findAll()
    return users
}