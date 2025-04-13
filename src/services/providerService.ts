import { Supplier } from "../common/interfaces/types";
import { CreateProviderFormData } from "../pages/admin/providers/validations";

export const createProvider = async (provider: CreateProviderFormData, companyId: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/companies/company/${companyId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(provider),
            credentials: "include",
            });

        if (!response.ok) {
        throw new Error("Error al crear la empresa");
        }

        const data = await response.json() as Supplier;

        return data;
        
        
    } catch (error) {
        throw error;
    }
};


export const getProviderById = async (id: string | undefined): Promise<Supplier> => {
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/suppliers/${id}`, {
                method: "GET",
                credentials: "include",
            });
    
            if (!response.ok) {
                throw new Error("Error al obtener la empresa");
            }
    
            const data = await response.json() as Supplier;
    
            return data;
        } catch (error) {
            throw error;
        }
}

export const getAllProviders = async (): Promise<Supplier[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/suppliers/`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Error al obtener las empresas");
        }

        const data = await response.json() as Supplier[];

        return data;
    } catch (error) {
        throw error;
    }
}