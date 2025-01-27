import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformData(data) {
  if (Array.isArray(data)) {
    return data.map(transformData); // If it's an array, transform every element
  }

  if (data.vehicleDetails) {
    data.specificData = data.vehicleDetails;
    delete data.vehicleDetails;
  }

  if (data.propertyDetails) {
    data.specificData = data.propertyDetails;
    delete data.propertyDetails;
  }

  if (data.appraisalDetails) {
    data.specificData = data.appraisalDetails;
    delete data.appraisalDetails;
  }

  return data;
}
