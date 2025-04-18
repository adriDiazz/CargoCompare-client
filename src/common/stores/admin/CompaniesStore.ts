import { create } from "zustand";
import { LogisticCompany } from "../../interfaces/types";




interface CompaniesList {
    companies: LogisticCompany[] | [];
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
    setCompanies: (companies: LogisticCompany[]) => void;
    addNewCompany: (company: LogisticCompany) => void;
    updateCompanyStore: (company: LogisticCompany) => void;
    deleteCompanyStore: (companyId: number) => void;
    
   
}

export const useCompaniesListStore = create<CompaniesList>((set) => ({
    companies: [],
    isLoading: true,
    setLoading: (isLoading) => set({ isLoading }),
    setCompanies: (companies) => set({ companies }),
    addNewCompany: (company: LogisticCompany) => set(state => ({ companies: [...state.companies, company] })),
    updateCompanyStore: (company: LogisticCompany) => set(state => ({
        companies: state.companies.map((c: LogisticCompany) => (c.id === company.id ? company : c)),
    })),
    deleteCompanyStore: (companyId: number) => set(state => ({
        companies: state.companies.filter((c: LogisticCompany) => c.id !== companyId),
        })),
    
    
}));
