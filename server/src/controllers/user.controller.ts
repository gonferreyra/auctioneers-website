import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import CustomError from '../utils/customError';

export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findByPk(req.userId);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
