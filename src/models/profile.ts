import { Model, DataTypes, Sequelize } from "sequelize";

export enum ProfileType {
  CLIENT = 'CLIENT',
  CONTRACTOR = 'CONTRACTOR'
}

type ProfileAttributes = {
  id: string,
  firstName: string,
  lastName: string,
  profession: string,
  balance: number,
  type: ProfileType,
}

const sequelize = new Sequelize()

export class Profile extends Model<ProfileAttributes> {}
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
      type: DataTypes.ENUM(ProfileType.CLIENT, ProfileType.CONTRACTOR),
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'profiles',
    modelName: 'Profile',
  }
)


