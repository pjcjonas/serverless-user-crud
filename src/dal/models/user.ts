import { Optional, DataTypes, Model, Sequelize } from "sequelize";

// Set the user model attributes
export interface UserAttributes {
  userUuid?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

// Set the user model attributes that can be null
interface UserCreateInterface
  extends UserAttributes,
    Optional<UserAttributes, 'createdAt' | 'updatedAt' | 'deletedAt'> {}

// Create the user model
export class User
  extends Model<UserAttributes, UserCreateInterface>
  implements UserAttributes
{
  public userUuid?: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public createdAt?: string
  public updatedAt?: string
  public deletedAt?: string
}

// Create the user model initializer
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
