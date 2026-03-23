import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { DB } from '../config/db';
import PropertyAuctionModel from './propertyAuction.model';
import VehicleAuctionModel from './vehicleAuction.model';

interface IAuctionModel
  extends Model<
    InferAttributes<IAuctionModel>,
    InferCreationAttributes<IAuctionModel>
  > {
  id?: number;
  title: string;
  subtitle: string;
  startingDate: Date;
  endingDate: Date;
  type: 'property' | 'vehicle';
}

const AuctionModel = DB.define<IAuctionModel>(
  'Auction',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: new Date().toISOString(),
      },
    },
    endingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isLaterThanStartingDate(this: IAuctionModel, value: Date) {
          if (value <= this.startingDate) {
            throw new Error('Ending date must be later than starting date');
          }
        },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'auctions',
    timestamps: true,
  }
);

// relations
AuctionModel.hasOne(PropertyAuctionModel, {
  foreignKey: 'auctionId',
  as: 'propertyDetails',
});
PropertyAuctionModel.belongsTo(AuctionModel, {
  foreignKey: 'auctionId',
});

AuctionModel.hasOne(VehicleAuctionModel, {
  foreignKey: 'auctionId',
  as: 'vehicleDetails',
});
VehicleAuctionModel.belongsTo(AuctionModel, {
  foreignKey: 'auctionId',
});

export default AuctionModel;
