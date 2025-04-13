import { UserFullData } from "../common/interfaces/types";

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