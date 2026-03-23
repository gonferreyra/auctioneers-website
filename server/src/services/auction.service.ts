import AuctionModel from '../models/auction.model';
import PropertyAuctionModel from '../models/propertyAuction.model';
import VehicleAuctionModel from '../models/vehicleAuction.model';
import CustomError from '../utils/customError';

type createAuctionParams = {
  title: string;
  subtitle: string;
  startingDate: Date;
  endingDate: Date;
  type: 'property' | 'vehicle';
  specificData?: any;
};

export const createAuction = async (data: createAuctionParams) => {
  const newAuction = await AuctionModel.create({
    title: data.title,
    subtitle: data.subtitle,
    startingDate: data.startingDate,
    endingDate: data.endingDate,
    type: data.type,
  });

  if (data.type === 'property' && data.specificData) {
    await PropertyAuctionModel.create({
      auctionId: newAuction.id,
      ...data.specificData,
    });
  } else if (data.type === 'vehicle' && data.specificData) {
    await VehicleAuctionModel.create({
      auctionId: newAuction.id,
      ...data.specificData,
    });
  }

  const auctionWithDetails = await AuctionModel.findByPk(newAuction.id, {
    include: [
      { model: PropertyAuctionModel, as: 'propertyDetails' },
      { model: VehicleAuctionModel, as: 'vehicleDetails' },
    ],
  });

  if (!auctionWithDetails) {
    throw new CustomError(500, 'Failed to retrieve created auction');
  }

  const auction: any = auctionWithDetails.toJSON();
  
  if (auction.type === 'property') {
    delete auction.vehicleDetails;
  } else if (auction.type === 'vehicle') {
    delete auction.propertyDetails;
  }

  return { newAuction: auction };
};