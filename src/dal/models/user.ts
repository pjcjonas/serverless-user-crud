import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
  [x: string]: any
}

export const UserModel = (sequelize?: Sequelize) => {
  return User.init({
    userUuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize: sequelize ?? new Sequelize(),
    modelName: 'Users',
    tableName: 'users',
    timestamps: true,
    deletedAt: true
  });
}
