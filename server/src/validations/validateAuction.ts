import { baseAuctionSchema, propertyAuctionSchema, vehicleAuctionSchema } from "./schemas"

export const validateAuction = (data: any) => {
  const baseData = baseAuctionSchema.parse(data);

  // if (!data.specificData || typeof data.specificData !== 'object') {
  //   throw new Error('specificData is required and must be an object');
  // }
  console.log(data)

  let specificData;

  switch (baseData.type) {
    case 'property':
      specificData = propertyAuctionSchema.parse(data.specificData)
      break
    case 'vehicle':
      specificData = vehicleAuctionSchema.parse(data.specificData)
      break
  }

  return { ...baseData, specificData }
}

export const validateAuctionSchema = baseAuctionSchema;