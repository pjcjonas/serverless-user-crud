import { DataTypes, Model, Sequelize } from "sequelize";

export class Task extends Model {
  [x: string]: any
}

export const TaskModel = (sequelize?: Sequelize) => {
  return Task.init({
    taskUuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    userUuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    taskDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize: sequelize ?? new Sequelize(),
    modelName: 'Tasks',
    tableName: 'tasks',
    timestamps: true,
    deletedAt: true
  });
}
