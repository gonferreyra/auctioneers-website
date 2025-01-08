import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DB } from '../config/db';

interface IPropertyCaseModel
  extends Model<
    InferAttributes<IPropertyCaseModel>,
    InferCreationAttributes<IPropertyCaseModel>
  > {
  id?: number;
  caseInternNumber: string;
  propertyRegistration?: string;
  percentage?: number;
  address?: string;
  description?: string;
  aps?: Date;
  apsExpiresAt?: Date;
  accountDgr?: string;
  nomenclature?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PropertyCaseModel = DB.define<IPropertyCaseModel>(
  'PropertyCase',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    caseInternNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'cases',
        key: 'internNumber',
      },
    },
    propertyRegistration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aps: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    apsExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    accountDgr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nomenclature: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'property_cases',
    timestamps: false,
    hooks: {
      beforeCreate: (caseInstance) => {
        if (caseInstance.aps) {
          const apsDate = new Date(caseInstance.aps);
          apsDate.setDate(apsDate.getDate() + 150);
          caseInstance.apsExpiresAt = apsDate;
        }
      },
      beforeUpdate: (caseInstance) => {
        if (caseInstance.aps) {
          const apsDate = new Date(caseInstance.aps);
          apsDate.setDate(apsDate.getDate() + 150);
          caseInstance.apsExpiresAt = apsDate;
        }
      },
    },
  }
);

export default PropertyCaseModel;
