import { NextFunction, Request, Response } from 'express';
import * as services from '../services/movement.service';
import MovementModel from '../models/movement.model';
import {
  movementIdSchema,
  newMovementSchema,
  updateMovementSchema,
} from '../validations/schemas';

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
    const request = newMovementSchema.parse(req.body);

    const { newMovement } = await services.createMovement(request);

    res.status(200).json({
      message: 'Movement created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateMovementHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = movementIdSchema.parse(req.params.id);
    const request = updateMovementSchema.parse(req.body);

    await services.updateMovement({ id, data: request });

    res.status(200).json({
      message: 'Movement updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// export const deleteMovementHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const movementId = movementIdSchema.parse(req.params.id);

//     await services.deleteMovement(movementId);

//     res.status(200).json({
//       message: 'Movement deleted successfully',
//     });
//   } catch (error) {
//     next(error);
//   }
// };
