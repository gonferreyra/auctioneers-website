import { Router } from 'express';
import * as controllers from '../controllers/auction.controller';

const auctionRoutes = Router();

auctionRoutes.get('/', controllers.getAuctionsHandler);
auctionRoutes.post('/', controllers.createAuctionHandler);

export default auctionRoutes;
