import { UserFullData } from "../common/interfaces/types";
import { CreateUserFormData } from "../pages/admin/users/validations";

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        });
    
        if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
        }
    
        const data = await response.json() as UserFullData[];

        return data;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw error;
    }
}

export const getUserById = async (id: string | undefined): Promise<UserFullData> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        });
    
        if (!response.ok) {
        throw new Error("Error al obtener el usuario");
        }
    
        const data = await response.json() as UserFullData;

        return data;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        throw error;
    }
}


export const updateUser = async (id: string | undefined, user: CreateUserFormData): Promise<UserFullData> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
        });
    
        if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
        }
    
        const data = await response.json() as UserFullData;

        return data;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        throw error;
    }
}   

export const deleteUser = async (id: string | undefined): Promise<boolean> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        });
    
       if (response.status !== 204) {
            throw new Error("Error al eliminar el usuario");
        }
    
        return true;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw error;
    }
}