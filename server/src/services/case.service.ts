import CaseModel from '../models/case.model';
import MovementModel from '../models/movement.model';
import CustomError from '../utils/customError';

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
