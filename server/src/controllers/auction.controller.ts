import { NextFunction, Request, Response } from 'express';
import AuctionModel from '../models/auction.model';
import * as services from '../services/auction.service';
import { validateAuction } from '../validations/validateAuction';

export const getAuctionsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auctions = await AuctionModel.findAll();

    res.status(200).json(auctions);
  } catch (error) {
    next(error);
  }
};

export const createAuctionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = validateAuction(req.body);

    const { newAuction } = await services.createAuction(request);

    res
      .status(201)
      .json({ message: `Auction ${newAuction.title} created successfully`, auction: newAuction });
  } catch (error) {
    next(error);
  }
};
