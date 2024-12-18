import { NextFunction, Request, Response } from 'express';
import CaseModel from '../models/case.model';
import CustomError from '../utils/customError';

export const getCasesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cases = await CaseModel.findAll();
    if (!cases || cases.length === 0) {
      throw new CustomError(404, 'Cases not found');
    }

    res.status(200).json(cases);
  } catch (error) {
    next(error);
  }
};
