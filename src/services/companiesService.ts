import { LogisticCompany } from "../common/interfaces/types";
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

        console.log(data);

        return data;
    } catch (error) {
        throw error;
    }
};


export const getProviderDetailsForCompany = async (companyId: string | undefined, providerId: string | undefined) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/suppliers/company/${companyId}/supplier/${providerId}`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Error al obtener el provedor");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}


export const deleteCompany = async (id: string | undefined) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/companies/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (response.status !== 204) {
            throw new Error("Error al eliminar la empresa");
        }

        return true;
    } catch (error) {
        throw error;
    }
}

export const updateCompany = async (id: string | undefined, company: CreateCompanyFormData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/companies/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(company),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Error al actualizar la empresa");
        }

        const data = await response.json() as LogisticCompany;

        return data;
    } catch (error) {
        throw error;
    }
}