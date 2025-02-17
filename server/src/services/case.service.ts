import z from 'zod';
import CaseModel from '../models/case.model';
import MovementModel from '../models/movement.model';
import CustomError from '../utils/customError';
import { createCaseSchema, updateCaseSchema } from '../validations/schemas';
import VehicleCaseModel from '../models/vehicleCase.model';
import PropertyCaseModel from '../models/propertyCase.model';
import AppraisalCaseModel from '../models/appraisalCase.model';
import { Op, Sequelize } from 'sequelize';

type GetCasesParams = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
  searchTerm?: string;
  searchType?: 'all' | 'recordNumber' | 'party';
  caseType?: 'all' | 'vehicle' | 'property' | 'appraisal';
};

export const getCasesPaginated = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  searchTerm,
  searchType,
  caseType,
}: GetCasesParams) => {
  const offset = (page - 1) * limit;

  let order: any[] = [[sortBy, sortOrder]];

  // sort by recent movements
  if (sortBy === 'recentMovement') {
    order = [
      [
        Sequelize.literal(
          'CASE WHEN "movements"."createdAt" IS NULL THEN 1 ELSE 0 END'
        ),
        'ASC',
      ],
      [{ model: MovementModel, as: 'movements' }, 'updatedAt', sortOrder],
    ];
  }

  const where: any = {};

  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    if (searchType === 'recordNumber') {
      where.record = { [Op.iLike]: `%${searchLower}%` };
    } else if (searchType === 'party') {
      where[Op.or] = [
        { plaintiff: { [Op.iLike]: `%${searchLower}%` } },
        { defendant: { [Op.iLike]: `%${searchLower}%` } },
      ];
    } else {
      where[Op.or] = [
        { record: { [Op.iLike]: `%${searchLower}%` } },
        { type: { [Op.iLike]: `%${searchLower}%` } },
        { plaintiff: { [Op.iLike]: `%${searchLower}%` } },
        { defendant: { [Op.iLike]: `%${searchLower}%` } },
      ];
    }
  }

  if (caseType && caseType !== 'all') {
    where.caseType = caseType;
  }

  const { count, rows: cases } = await CaseModel.findAndCountAll({
    limit,
    offset,
    order,
    where,
    include: [
      {
        model: MovementModel,
        as: 'movements',
        attributes: ['id', 'description', 'updatedAt'],
        required: false, // This makes it a LEFT JOIN
      },
      {
        model: VehicleCaseModel,
        as: 'vehicleDetails',
      },
      {
        model: PropertyCaseModel,
        as: 'propertyDetails',
      },
      {
        model: AppraisalCaseModel,
        as: 'appraisalDetails',
      },
    ],
    distinct: true, // This ensures correct count with includes
    subQuery: false, // This can help with performance in some cases
  });

  if (!cases || cases.length === 0) {
    throw new CustomError(404, 'Cases not found');
  }

  cases.forEach((case_) => {
    switch (case_.caseType) {
      case 'property':
        delete case_.dataValues.vehicleDetails;
        delete case_.dataValues.appraisalDetails;
        break;
      case 'vehicle':
        delete case_.dataValues.propertyDetails;
        delete case_.dataValues.appraisalDetails;
        break;
      case 'appraisal':
        delete case_.dataValues.vehicleDetails;
        delete case_.dataValues.propertyDetails;
        break;
    }
  });

  return {
    currentPage: page,
    totalPages: Math.ceil(count - 1 / limit),
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
        attributes: ['id', 'caseInternNumber', 'description', 'createdAt'],
      },
      {
        model: VehicleCaseModel,
        as: 'vehicleDetails',
      },
      {
        model: PropertyCaseModel,
        as: 'propertyDetails',
      },
      {
        model: AppraisalCaseModel,
        as: 'appraisalDetails',
      },
    ],
  });

  if (!caseWithMovements) {
    throw new CustomError(404, `Case with id ${id} not found`);
  }

  switch (caseWithMovements.caseType) {
    case 'property':
      delete caseWithMovements.dataValues.vehicleDetails;
      delete caseWithMovements.dataValues.appraisalDetails;
      break;
    case 'vehicle':
      delete caseWithMovements.dataValues.propertyDetails;
      delete caseWithMovements.dataValues.appraisalDetails;
      break;
    case 'appraisal':
      delete caseWithMovements.dataValues.vehicleDetails;
      delete caseWithMovements.dataValues.propertyDetails;
      break;
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

  // Create specific case type
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

  return { newCase };
};

type updateCaseParams = {
  id: number;
  data: z.infer<typeof updateCaseSchema>;
};

export const updateCase = async ({ id, data }: updateCaseParams) => {
  const caseToUpdate = await CaseModel.findOne({
    where: {
      id,
      caseType: data.caseType,
    },
  });

  if (!caseToUpdate) {
    throw new CustomError(404, 'Case not found or caseType does not match');
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
    const propertyCaseToUpdate = await PropertyCaseModel.findOne({
      where: {
        caseInternNumber: caseToUpdate.internNumber,
      },
    });

    if (propertyCaseToUpdate) {
      Object.assign(propertyCaseToUpdate, data.specificData);
      await propertyCaseToUpdate.save(); // Use save to trigger hooks
    }
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

export const deleteCase = async (id: number) => {
  const deletedCase = await CaseModel.destroy({
    where: {
      id,
    },
  });

  if (!deletedCase) {
    throw new CustomError(404, 'Case not found');
  }

  return { deletedCase };
};
