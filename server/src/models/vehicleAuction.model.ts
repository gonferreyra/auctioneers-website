import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DB } from '../config/db';
import AuctionModel from './auction.model';

interface IVehiclleAuctionModel
  extends Model<
    InferAttributes<IVehiclleAuctionModel>,
    InferCreationAttributes<IVehiclleAuctionModel>
  > {
  id?: number;
  auctionId: number;
  make: string;
  model: string;
  year: number;
  vehicleType: 'car' | 'pickup' | 'truck' | 'others';
  mileage: number;
  descripcion: string;
  images?: string[];
  exhibition?: {
    location: string;
    startDate: Date;
    endDate: Date;
  };
}

const VehicleAuctionModel = DB.define<IVehiclleAuctionModel>(
  'VehicleAuction',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    auctionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AuctionModel,
        key: 'id',
      },
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vehicleType: {
      type: DataTypes.ENUM('car', 'pickup', 'truck', 'others'),
      allowNull: false,
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exhibition: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: 'vehicle_auctions',
  }
);

export default VehicleAuctionModel;
