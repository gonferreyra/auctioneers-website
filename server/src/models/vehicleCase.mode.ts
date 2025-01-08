import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DB } from '../config/db';

interface IVehicleCaseModel
  extends Model<
    InferAttributes<IVehicleCaseModel>,
    InferCreationAttributes<IVehicleCaseModel>
  > {
  id?: number;
  caseInternNumber: string;
  licensePlate?: string;
  brand?: string;
  model?: string;
  year?: number;
  chassisBrand?: string;
  chassisNumber?: string;
  engineBrand?: string;
  engineNumber?: string;
}

const VehicleCaseModel = DB.define<IVehicleCaseModel>(
  'VehicleCase',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caseInternNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'cases',
        key: 'internNumber',
      },
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    chassisBrand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chassisNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engineBrand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engineNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'vehicle_cases',
    timestamps: true,
  }
);

export default VehicleCaseModel;
