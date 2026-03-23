import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DB } from '../config/db';
import AuctionModel from './auction.model';

interface IPropertyAuctionModel
  extends Model<
    InferAttributes<IPropertyAuctionModel>,
    InferCreationAttributes<IPropertyAuctionModel>
  > {
  id?: number;
  auctionId: number;
  address: string;
  squareMeters: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType: 'house' | 'apartment' | 'land' | 'commercial';
  descripcion: string;
  images?: string[];
  exhibition?: {
    location: string;
    startDate: Date;
    endDate: Date;
  };
}

const PropertyAuctionModel = DB.define<IPropertyAuctionModel>(
  'PropertyAuction',
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    squareMeters: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    propertyType: {
      type: DataTypes.ENUM('house', 'apartment', 'land', 'commercial'),
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
    tableName: 'property_auctions',
  }
);

export default PropertyAuctionModel;
