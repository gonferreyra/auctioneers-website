import z from 'zod';
import MovementModel from '../models/movement.model';
import CustomError from '../utils/customError';
import { updateMovementSchema } from '../validations/schemas';
import CaseModel from '../models/case.model';

type CreateMovementParams = {
  caseInternNumber: string;
  description: string;
};

export const createMovement = async ({
  caseInternNumber,
  description,
}: CreateMovementParams) => {
  const caseExist = await CaseModel.findOne({
    where: {
      internNumber: caseInternNumber,
    },
  });

  if (!caseExist) {
    throw new CustomError(404, 'Case not found');
  }

  const newMovement = await MovementModel.create({
    caseInternNumber,
    description,
  });

  if (!newMovement) {
    throw new CustomError(
      500,
      'Error creating a new movement. Contact administrator'
    );
  }

  return {
    newMovement,
  };
};

// type UpdateMovementParams = {
//   id: string;
//   data: z.infer<typeof updateMovementSchema>;
// };

// export const updateMovement = async ({ id, data }: UpdateMovementParams) => {
//   const caseExist = await CaseModel.findOne({
//     where: {
//       id: data.caseId,
//     },
//   });

//   if (!caseExist) {
//     throw new CustomError(404, 'Case not found');
//   }

//   const movementToUpdate = await MovementModel.findOne({
//     where: {
//       id,
//     },
//   });

//   if (!movementToUpdate) {
//     throw new CustomError(404, 'Movement not found');
//   }

//   const updatedMovement = await movementToUpdate.update(data);

//   return { updatedMovement };
// };

export const deleteMovement = async (movementId: string) => {
  const deletedMovement = await MovementModel.destroy({
    where: {
      id: movementId,
    },
  });

  if (!deletedMovement) {
    throw new CustomError(404, 'Movement not found');
  }

  return { deletedMovement };
};
