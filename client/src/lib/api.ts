import API from '@/config/apiClient';

type LoginData = {
  email: string;
  password: string;
};

export const login = async (data: LoginData) => {
  const response = await API.post('/auth/login', data);
  return response;
};

type CasesPaginatedParams = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};

export const getCasesPaginated = async ({
  page,
  limit,
  sortBy,
  sortOrder,
}: CasesPaginatedParams) => {
  const response = await API.get(
    `/cases?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );
  // change response to return cases directly
  return response;
};

export const getCaseById = async (id: string) => {
  const response = await API.get(`/cases/${id}`);
  return response.data;
};
