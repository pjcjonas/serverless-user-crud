import { DataTypes, Transaction } from 'sequelize'
import path from 'path'

const name = '20230916051725-create-task.ts'
const __dirname = path.dirname(name)
const location = __dirname + '/' + name

const up = async ({ context: queryInterface }: any) => {
  await queryInterface.sequelize.transaction(async (t: Transaction) => {
    await queryInterface.createTable('Tasks', {
      taskUuid: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      userUuid: {
        type: DataTypes.UUID,
        allowNull: false
      },
      taskDescription: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    });
  })
}

const down = async ({ context: queryInterface }: any) => {
  await queryInterface.sequelize.transaction(async (t: Transaction) => {
    await queryInterface.dropTable('Tasks');
  })
}

export { up, down, name, location }
