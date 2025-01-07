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
      'lawOffice',
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

export const getCaseById = async (id: number) => {
  const caseWithMovements = await CaseModel.findByPk(id, {
    include: [
      {
        model: MovementModel,
        as: 'movements',
        attributes: ['description'],
      },
    ],
  });

  if (!caseWithMovements) {
    throw new CustomError(404, `Case with id ${id} not found`);
  }

  return { caseWithMovements };
};

type createCaseParams = z.infer<typeof createCaseSchema>;

export const createCase = async (data: createCaseParams) => {
  // check if case already exists by record number (numero de expediente)
  const previusCase = await CaseModel.findOne({
    where: {
      record: data.record,
    },
  });

  if (previusCase) {
    throw new CustomError(
      400,
      `Case with record number ${data.record} already exists on database`
    );
  }

  // create new base case
  const newCase = await CaseModel.create({
    ...data,
    // status: 'active',
  });

  // Ensure internNumber is generated
  if (!newCase.internNumber) {
    throw new Error('Failed to generate internNumber');
  }

  if (data.caseType === 'vehicle') {
    await VehicleCaseModel.create({
      caseInternNumber: newCase.internNumber,
      ...data.specificData,
    });
  } else if (data.caseType === 'property') {
    await PropertyCaseModel.create({
      caseInternNumber: newCase.internNumber,
      ...data.specificData,
    });
  } else if (data.caseType === 'appraisal') {
    await AppraisalCaseModel.create({
      caseInternNumber: newCase.internNumber,
      ...data.specificData,
    });
  }
  // else if (data.caseType === 'property') {
  //   await PropertyCaseModel.create({
  //     caseId: newCase.id!,
  //     ...data.specificData,
  //   });
  // } else if (data.caseType === 'appraisal') {
  //   await AppraisalCaseModel.create({
  //     caseId: newCase.id,
  //   });
  // }

  return { newCase };
};

type updateCaseParams = {
  id: number;
  data: z.infer<typeof updateCaseSchema>;
};

export const updateCase = async ({ id, data }: updateCaseParams) => {
  const caseToUpdate = await CaseModel.findByPk(id);

  if (!caseToUpdate) {
    throw new CustomError(404, 'Case not found');
  }

  if (!data) {
    throw new Error('Data to update is required');
  }

  // omit caseType field to avoid updating it
  const { caseType, ...updateData } = data;

  // update basecase
  const updatedCase = await caseToUpdate.update(updateData);

  if (caseToUpdate.caseType === 'vehicle' && data.specificData) {
    await VehicleCaseModel.update(
      data.specificData as {
        licensePlate?: string;
        brand?: string;
        model?: string;
        year?: number;
        chassisBrand?: string;
        chassisNumber?: string;
        engineBrand?: string;
        engineNumber?: string;
      },
      {
        where: {
          caseInternNumber: caseToUpdate.internNumber,
        },
      }
    );
  } else if (caseToUpdate.caseType === 'property' && data.specificData) {
    await PropertyCaseModel.update(
      data.specificData as {
        propertyRegistration?: string;
        percentage?: number;
        address?: string;
        description?: string;
        aps?: Date;
        apsExpiresAt?: Date;
        acccountDgr?: string;
        nomenclature?: string;
      },
      {
        where: {
          caseInternNumber: caseToUpdate.internNumber,
        },
      }
    );
  } else if (caseToUpdate.caseType === 'appraisal' && data.specificData) {
    await AppraisalCaseModel.update(
      data.specificData as {
        itemToAppraise?: string;
        description?: string;
      },
      {
        where: {
          caseInternNumber: caseToUpdate.internNumber,
        },
      }
    );
  }

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
