import { NextFunction, Request, Response } from 'express';
import * as services from '../services/case.service';
import CaseModel from '../models/case.model';
import CustomError from '../utils/customError';
import MovementModel from '../models/movement.model';
import {
  caseIdSchema,
  createCaseSchema,
  getCasesPaginatedSchema,
  updateCaseSchema,
} from '../validations/schemas';

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

export const createCaseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = createCaseSchema.parse(req.body);

    const { newCase } = await services.createCase(request);

    res.status(201).json(newCase);
  } catch (error) {
    next(error);
  }
};

export const updateCaseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const caseId = caseIdSchema.parse(req.params.id);
    const request = updateCaseSchema.parse(req.body);

    const { updatedCase } = await services.updateCase({
      caseId,
      data: request,
    });

    res.status(200).json(updatedCase);
  } catch (error) {
    next(error);
  }
};

export const deleteCaseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const caseId = caseIdSchema.parse(req.params.id);

    const { deletedCase } = await services.deleteCase(caseId);

    res.status(200).json({
      message: 'Case deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
