import {
  baseCaseSchema,
  propertyCaseSchema,
  vehicleCaseSchema,
} from './schemas';

export const validateCase = (data: any) => {
  const baseData = baseCaseSchema.parse(data);

  let specificData;

  switch (baseData.caseType) {
    case 'vehicle':
      specificData = vehicleCaseSchema.parse(data.specificData);
      break;
    case 'property':
      specificData = propertyCaseSchema.parse(data.specificData);

    default:
      throw new Error('Invalid case type');
  }

  return {
    ...baseData,
    specificData,
  };
};
