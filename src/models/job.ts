import { Model, Sequelize, DataTypes } from "sequelize"

type JobAttributes = {
  id: string,
  description: string,
  price: string,
  paid: any
  paymentDate: Date,
  contractId: string,
}

const sequelize = new Sequelize()

export class Contract extends Model<JobAttributes> {}
Contract.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    paymentDate: {
      type: DataTypes.DATE
    },
    contractId: {
      type: DataTypes.UUID,
      references: {
        model: 'Contract',
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