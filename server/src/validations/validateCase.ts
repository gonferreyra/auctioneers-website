import CustomError from '../utils/customError';
import {
  appraisalCaseSchema,
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
      break;
    case 'appraisal':
      specificData = appraisalCaseSchema.parse(data.specificData);
      break;
    default:
      throw new CustomError(400, 'Invalid case type');
  }

  return {
    ...baseData,
    specificData,
  };
};

export const validateUpdateCase = (data: any) => {
  const baseData = baseCaseSchema.partial().parse(data);

  let specificData;

  switch (baseData.caseType) {
    case 'vehicle':
      specificData = vehicleCaseSchema.partial().parse(data.specificData);
      break;
    case 'property':
      specificData = propertyCaseSchema.partial().parse(data.specificData);
      break;
    case 'appraisal':
      specificData = appraisalCaseSchema.partial().parse(data.specificData);
      break;
    default:
      throw new CustomError(400, 'Invalid case type');
  }

  return {
    ...baseData,
    specificData,
  };
};

// export const validateCase = (data: any, options = { partial: false }) => {
//   const baseData = options.partial
//     ? baseCaseSchema.partial().parse(data)
//     : baseCaseSchema.parse(data);

//   let specificData;

//   switch (baseData.caseType) {
//     case 'vehicle':
//       specificData = options.partial
//         ? vehicleCaseSchema.partial().parse(data.specificData)
//         : vehicleCaseSchema.parse(data.specificData);
//       break;
//     case 'property':
//       specificData = options.partial
//         ? propertyCaseSchema.parse(data.specificData)
//         : propertyCaseSchema.parse(data.specificData);
//       break;
//     case 'appraisal':
//       specificData = {};
//       break;
//     default:
//       throw new Error('Invalid case type');
//   }

//   return {
//     ...baseData,
//     specificData,
//   };
// };
