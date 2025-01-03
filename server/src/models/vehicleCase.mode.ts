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
  caseId: number;
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
    caseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cases',
        key: 'id',
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
