import Axios from 'axios';

const API = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Función para transformar los datos
function transformData(data: any): any {
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

API.interceptors.response.use(
  (response) => {
    // console.log('response', response.data.cases);
    if (response.data) {
      response.data.cases = transformData(response.data.cases);
    }
    return response;
  },
  (error) => {
    const { status, data } = error.response;
    // return Promise.reject({ status, ...data });
    return Promise.reject({
      status,
      message:
        //  Try to set the error message to the zod errror message OR data.message (witch is the error from the customError middleware)
        // `Field: ${error.response?.data?.errors?.[0]?.path} - Error: ${error.response.data.errors?.[0].message}` ||
        data.message,
    });
  },
);

export default API;
