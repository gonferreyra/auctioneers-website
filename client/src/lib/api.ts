import API from '@/config/apiClient';
import { TCreateCaseSchema } from '@/validations/schemas';

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
  return response.data;
};

export const getCaseById = async (id: number) => {
  const response = await API.get(`/cases/${id}`);
  return response.data;
};

export const createNewCase = async (data: TCreateCaseSchema) => {
  const response = await API.post('/cases', data);
  return response.data;
};

export const updateCase = async (id: number, data: any) => {
  const response = await API.patch(`/cases/${id}`, data);
  return response.data;
};
