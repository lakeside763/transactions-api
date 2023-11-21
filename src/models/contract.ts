import { Model, Sequelize, DataTypes } from "sequelize"

enum StatusType {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  TERMINATED = 'TERMINATED',
}

type ContractAttributes = {
  id: string,
  terms: string,
  status: StatusType,
  clientId: any,
  contractorId: any
}

const sequelize = new Sequelize()

export class Contract extends Model<ContractAttributes> {}
Contract.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    terms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(StatusType.NEW, StatusType.IN_PROGRESS, StatusType.TERMINATED),
    },
    clientId: {
      type: DataTypes.UUID,
      references: {
        model: 'Profile',
        key: 'id'
      }
    },
    contractorId: {
      type: DataTypes.UUID,
      references: {
        model: 'Profile',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'contracts',
    modelName: 'Contract'
  }
)