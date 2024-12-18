import { NextFunction, Request, Response } from 'express';
import MovementModel from '../models/movement.model';

export const getMovementsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movements = await MovementModel.findAll();

    res.status(200).json(movements);
  } catch (error) {
    next(error);
  }
};
