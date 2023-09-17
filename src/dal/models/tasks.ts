import { Optional, DataTypes, Model, Sequelize } from "sequelize";

// Set the task model attributes
export interface TaskAttributes {
  taskUuid?: string;
  userUuid: string;
  taskName: string;
  taskDescription: string;
  taskDate: string;
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

// Set the task model attributes that can be null
interface TaskCreateInterface
  extends TaskAttributes,
    Optional<TaskAttributes, 'createdAt' | 'updatedAt' | 'deletedAt'> {}

// Create the task model
export class Task
  extends Model<TaskAttributes, TaskCreateInterface>
  implements TaskAttributes
{
  public taskUuid!: string;
  public userUuid!: string;
  public taskName!: string;
  public taskDate!: string;
  public taskDescription!: string;
  public createdAt?: string
  public updatedAt?: string
  public deletedAt?: string
}

// Create the task model initializer
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
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    taskDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize: sequelize ?? new Sequelize(),
    modelName: 'Tasks',
    tableName: 'Tasks',
    timestamps: true,
    deletedAt: true
  });
}
