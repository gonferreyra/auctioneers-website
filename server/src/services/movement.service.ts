import MovementModel from '../models/movement.model';
import CustomError from '../utils/customError';

type CreateMovementParams = {
  case_id: number;
  description: string;
};

export const createMovement = async ({
  case_id,
  description,
}: CreateMovementParams) => {
  const newMovement = await MovementModel.create({
    case_id,
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
