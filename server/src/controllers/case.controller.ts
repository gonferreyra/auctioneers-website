import { NextFunction, Request, Response } from 'express';
import * as services from '../services/case.service';
import CaseModel from '../models/case.model';
import CustomError from '../utils/customError';
// import z from 'zod';
import MovementModel from '../models/movement.model';
import { caseIdSchema, getCasesPaginatedSchema } from '../validations/schemas';

export const getCasesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, sortBy, sortOrder } = getCasesPaginatedSchema.parse(
      req.query
    );

    const cases = await services.getCasesPaginated({
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder: sortOrder.toUpperCase() as 'ASC' | 'DESC',
    });

    res.status(200).json(cases);
  } catch (error) {
    next(error);
  }
};

export const getCaseByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const caseId = caseIdSchema.parse(req.params.id);
    const caseWithMovements = await CaseModel.findByPk(caseId, {
      include: [
        {
          model: MovementModel,
          as: 'movements',
          attributes: ['id', 'description'],
        },
      ],
    });

    if (!caseWithMovements) {
      throw new CustomError(404, 'Case not found');
    }

    res.status(200).json(caseWithMovements);
  } catch (error) {
    next(error);
  }
};
