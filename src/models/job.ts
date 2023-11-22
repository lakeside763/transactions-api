import { Model, DataTypes } from "sequelize"
import { sequelize } from "./index";
import { Contract } from "./contract";

type JobAttributes = {
  id: string,
  description: string,
  price: string,
  paid: Boolean
  paymentDate: Date,
  contractId: string,
  createdAt: Date,
}

export class Job extends Model<JobAttributes> {
  declare price: number;
}
Job.init(
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
    },
    createdAt: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'jobs',
    modelName: 'Job'
  }
);

