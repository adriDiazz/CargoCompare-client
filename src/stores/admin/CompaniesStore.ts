import { create } from "zustand";
import { LogisticCompany } from "../../interfaces/types";




interface CompaniesList {
    companies: LogisticCompany[] | [];
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
    setCompanies: (companies: LogisticCompany[]) => void;
    addNewCompany: (company: LogisticCompany) => void;
    
   
}

export const useCompaniesListStore = create<CompaniesList>((set) => ({
    companies: [],
    isLoading: true,
    setLoading: (isLoading) => set({ isLoading }),
    setCompanies: (companies) => set({ companies }),
    addNewCompany: (company: LogisticCompany) => set(state => ({ companies: [...state.companies, company] })),
    
}));
