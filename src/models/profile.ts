import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";
import { Contract } from "./contract";
import { Job } from "./job";

export enum ProfileType {
  CLIENT = 'CLIENT',
  CONTRACTOR = 'CONTRACTOR'
}

export type ProfileAttributes = {
  id: string,
  firstName: string,
  lastName: string,
  profession: string,
  balance: number,
  type: ProfileType,
}

export class Profile extends Model<ProfileAttributes> {
  declare id: string
  declare balance: number;
}
Profile.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(12, 2),
    },
    type: {
      type: DataTypes.ENUM,
      values: [ProfileType.CLIENT, ProfileType.CONTRACTOR]
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'profiles',
    modelName: 'Profile',
  }
)

Profile.hasMany(Contract, { foreignKey: 'clientId', as: 'ClientContracts' });
Profile.hasMany(Contract, { foreignKey: 'contractorId', as: 'ContractorContracts' });
Contract.belongsTo(Profile, { foreignKey: 'clientId', as: 'Client' });
Contract.belongsTo(Profile, { foreignKey: 'contractorId', as: 'Contractor' });
Contract.hasMany(Job, { foreignKey: 'contractId' })
Job.belongsTo(Contract, { foreignKey: 'contractId' });
