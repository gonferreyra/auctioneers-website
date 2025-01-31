import { queryClient } from '@/components/react-query-provider';
import { transformData } from '@/lib/utils';
import axios from 'axios';

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
};

const API = axios.create(options);

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response);

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
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    // try to refresh access token behind the scene
    if (status === 401 && data?.errorCode === 'INVALID_ACCESS_TOKEN') {
      try {
        await TokenRefreshClient.get('/auth/refresh');
        return TokenRefreshClient(config);
      } catch (error) {
        console.error(error);
        queryClient.clear();
      }
    }

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
