import { create } from 'zustand';

type CaseStateStore = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  debouncedValue: string;
  setDebouncedValue: (searchTerm: string) => void;
  searchType: 'all' | 'recordNumber' | 'party';
  setSearchType: (type: 'all' | 'recordNumber' | 'party') => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  caseType: 'all' | 'vehicle' | 'property' | 'appraisal';
  setCaseType: (caseType: 'all' | 'vehicle' | 'property' | 'appraisal') => void;
};

export const useCaseStore = create<CaseStateStore>()((set) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }),
  debouncedValue: '',
  setDebouncedValue: (searchTerm) => set({ debouncedValue: searchTerm }),
  searchType: 'all',
  setSearchType: (type) => set({ searchType: type }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  caseType: 'all',
  setCaseType: (caseType) => set({ caseType }),
}));
