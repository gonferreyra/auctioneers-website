import { transformData } from '@/lib/utils';
import Axios from 'axios';

const API = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => {
    if (response.config.method === 'get') {
      if (response.data) {
        if (response.config.url?.includes('/cases?page=')) {
          // Transform data for paginated cases
          response.data.cases = transformData(response.data.cases);
        } else if (response.config.url?.includes('/cases')) {
          // Transform data for single case
          response.data = transformData(response.data);
        }
      }
    }
    // console.log(response.data);
    return response;
  },
  (error) => {
    const { status, data } = error.response;
    // return Promise.reject({ status, ...data });
    return Promise.reject({
      status,
      message: error.response?.data?.errors?.[0]
        ? `Field: ${error.response?.data?.errors?.[0]?.path} - Error: ${error.response.data.errors?.[0].message}`
        : data.message,
    });
  },
);

export default API;
