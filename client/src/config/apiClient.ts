import Axios from 'axios';

const API = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
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
