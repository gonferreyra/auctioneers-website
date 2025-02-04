import API from '@/config/apiClient';
import { TCreateCaseSchema, TUpdateCaseSchema } from '@/validations/schemas';

type LoginData = {
  email: string;
  password: string;
};

export const login = async (data: LoginData) => {
  const response = await API.post('/auth/login', data);
  return response;
};

export const logout = async () => {
  const response = await API.get('/auth/logout');
  return response;
};

type CasesPaginatedParams = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  searchTerm?: string;
  searchType?: 'all' | 'recordNumber' | 'party';
  caseType?: 'all' | 'vehicle' | 'property' | 'appraisal';
};

export const getCasesPaginated = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  searchTerm,
  searchType,
  caseType,
}: CasesPaginatedParams) => {
  const response = await API.get(
    `/cases?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${searchTerm}&searchType=${searchType}&caseType=${caseType}`,
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

export const updateCase = async (id: number, data: TUpdateCaseSchema) => {
  const response = await API.patch(`/cases/${id}`, data);
  return response.data;
};

export const getUser = async () => {
  const response = await API.get('/user');
  return response;
};
