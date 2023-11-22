import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";
import { Job } from "./job";

export enum StatusType {
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

export class Contract extends Model<ContractAttributes> {
  declare id: string;
}
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
);