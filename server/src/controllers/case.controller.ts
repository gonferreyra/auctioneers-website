import { NextFunction, Request, Response } from 'express';
import CaseModel from '../models/case.model';
import CustomError from '../utils/customError';
import z from 'zod';
import MovementModel from '../models/movement.model';

export const getCasesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // current page
    const limit = parseInt(req.query.limit as string) || 10; // number of cases per page
    const offset = (page - 1) * limit;
    const sortBy = (req.query.sortBy as string) || 'id'; // sort by
    const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC'; // sort order

    let order: any[] = [[sortBy, sortOrder]];

    // recent movements sort
    if (sortBy === 'recentMovement') {
      order = [
        [{ model: MovementModel, as: 'movements' }, 'createdAt', sortOrder],
      ];
    }

    const { count, rows: cases } = await CaseModel.findAndCountAll({
      limit,
      offset,
      order,
      // only these attributes will be returned - right now all are selected until front is ready
      attributes: [
        'id',
        'intern_number',
        'status',
        'record',
        'plaintiff',
        'defendant',
        'type',
        'court',
        'law_office',
        'debt',
        'aps',
        'aps_expiresAt',
        'is_executed',
        'address',
        'account_dgr',
        'nomenclature',
        'description',
        'createdAt',
        'updatedAt',
      ],
      include:
        sortBy === 'recentMovement'
          ? [
              {
                model: MovementModel,
                as: 'movements',
                // attributes to show from movements, in this case for ordering (movements will not be shown on front for this request)
                attributes: ['description', 'createdAt', 'updatedAt'],
              },
            ]
          : [],
    });

    if (!cases || cases.length === 0) {
      throw new CustomError(404, 'Cases not found');
    }

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalCases: count,
      cases,
    });
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
    const caseId = z.string().parse(req.params.id);
    const caseWithMovements = await CaseModel.findByPk(caseId, {
      include: [
        {
          model: MovementModel,
          as: 'movements',
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
