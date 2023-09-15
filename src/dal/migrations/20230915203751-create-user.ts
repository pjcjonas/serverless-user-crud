import { DataTypes, Transaction } from 'sequelize'
import path from 'path'

const name = '20230915203751-create-user.ts'
const __dirname = path.dirname(name)
const location = __dirname + '/' + name

const up = async ({ context: queryInterface }: any) => {
  await queryInterface.sequelize.transaction(async (t: Transaction) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
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
    await queryInterface.dropTable('Users');
  })
}

export { up, down, name, location }
