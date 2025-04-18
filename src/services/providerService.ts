import { Supplier } from "../common/interfaces/types";
import { CreateProviderFormData } from "../pages/admin/providers/validations";

export const createProvider = async (provider: CreateProviderFormData, companyId: string | undefined) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/suppliers/company/${companyId}`, {
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

export const updateProvider = async (id: string | undefined, provider: CreateProviderFormData): Promise<Supplier> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/suppliers/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(provider),
            credentials: "include",
        });

          if (!response.ok) {
            throw new Error("Error al actualizar la empresa");
        }

        const data = await response.json() as Supplier;

        return data;
        
        
    } catch (error) {
        throw error;
    }
}

export const deleteProvider = async (id: string | undefined): Promise<boolean> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/suppliers/${id}`, {
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