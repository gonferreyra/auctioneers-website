import { NextFunction, Request, Response } from 'express';
import * as services from '../services/movement.service';
import MovementModel from '../models/movement.model';
import { movementSchema } from '../validations/schemas';

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

export const createMovementHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = movementSchema.parse(req.body);

    const { newMovement } = await services.createMovement(request);

    res.status(200).json({
      message: 'Movement created successfully',
    });
  } catch (error) {
    next(error);
  }
};
