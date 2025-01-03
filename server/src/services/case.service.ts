import z from 'zod';
import CaseModel from '../models/case.model';
import MovementModel from '../models/movement.model';
import CustomError from '../utils/customError';
import { createCaseSchema, updateCaseSchema } from '../validations/schemas';
import VehicleCaseModel from '../models/vehicleCase.mode';
import PropertyCaseModel from '../models/propertyCase.model';
import AppraisalCaseModel from '../models/appraisalCase.model';

type GetCasesParams = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
};

export const getCasesPaginated = async ({
  page,
  limit,
  sortBy,
  sortOrder,
}: GetCasesParams) => {
  const offset = (page - 1) * limit;

  let order: any[] = [[sortBy, sortOrder]];

  // sort by recent movements
  if (sortBy === 'recentMovement') {
    order = [
      [{ model: MovementModel, as: 'movements' }, 'createdAt', sortOrder],
    ];
  }

  const { count, rows: cases } = await CaseModel.findAndCountAll({
    limit,
    offset,
    order,
    attributes: [
      'id',
      'internNumber',
      'status',
      'record',
      'plaintiff',
      'defendant',
      'type',
      'court',
      'law_office',
      'debt',
      'caseType',
      'createdAt',
      'updatedAt',
    ],
    include:
      sortBy === 'recentMovement'
        ? [
            {
              model: MovementModel,
              as: 'movements',
              attributes: ['description', 'createdAt', 'updatedAt'],
            },
          ]
        : [],
  });

  if (!cases || cases.length === 0) {
    throw new CustomError(404, 'Cases not found');
  }

  return {
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalCases: count,
    cases,
  };
};

export const getCaseById = async (caseId: string) => {
  const caseWithMovements = await CaseModel.findByPk(caseId, {
    include: [
      {
        model: MovementModel,
        as: 'movements',
        attributes: ['description'],
      },
    ],
  });

  if (!caseWithMovements) {
    throw new CustomError(404, 'Case not found');
  }

  return { caseWithMovements };
};

type createCaseParams = z.infer<typeof createCaseSchema>;

export const createCase = async (data: createCaseParams) => {
  // check if case already exists
  const previusCase = await CaseModel.findOne({
    where: {
      internNumber: data.internNumber,
    },
  });

  if (previusCase) {
    throw new CustomError(
      400,
      `Case with number ${data.internNumber} already exists on database`
    );
  }

  // create new case
  const newCase = await CaseModel.create({
    ...data,
    status: 'active',
  });

  if (data.caseType === 'vehicle') {
    await VehicleCaseModel.create({
      caseId: newCase.id!,
      ...data.specificData,
    });
  } else if (data.caseType === 'property') {
    await PropertyCaseModel.create({
      caseId: newCase.id!,
      ...data.specificData,
    });
  } else if (data.caseType === 'appraisal') {
    await AppraisalCaseModel.create({
      caseId: newCase.id,
    });
  }

  return { newCase };
};

type updateCaseParams = {
  caseId: string;
  data: z.infer<typeof updateCaseSchema>;
};

export const updateCase = async ({ caseId, data }: updateCaseParams) => {
  const caseToUpdate = await CaseModel.findByPk(caseId);

  if (!caseToUpdate) {
    throw new CustomError(404, 'Case not found');
  }

  const updatedCase = await caseToUpdate.update(data);

  return { updatedCase };
};

export const deleteCase = async (caseId: string) => {
  const deletedCase = await CaseModel.destroy({
    where: {
      id: caseId,
    },
  });

  if (!deletedCase) {
    throw new CustomError(404, 'Case not found');
  }

  return { deletedCase };
};
