import { LogisticCompany } from "../interfaces/types";
import { CreateCompanyFormData } from "../pages/admin/companies/validations";

export const createCompany = async (company: CreateCompanyFormData) => {
    try {

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/companies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(company),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al crear la empresa");
    }

    const data = await response.json() as LogisticCompany;

    return data;
        
        
    } catch (error) {
        throw error;
    }
};


export const getAllCompanies = async (): Promise<LogisticCompany[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/companies/`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Error al obtener las empresas");
        }

        const data = await response.json() as LogisticCompany[];

        return data;
    } catch (error) {
        throw error;
    }
};


export const getCompnanyById = async (id: string | undefined): Promise<LogisticCompany> => {

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/companies/${id}`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Error al obtener la empresa");
        }

        const data = await response.json() as LogisticCompany;

        return data;
    } catch (error) {
        throw error;
    }
};