import { CreateTariffRequest, GeneralTariffDTO } from "../common/interfaces/types";

export const createTariffByCompanyAndProvider = async (createTariffRequest: CreateTariffRequest) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/tariffs/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createTariffRequest),
            credentials: "include",
            });

        if (!response.ok) {
        throw new Error("Error al crear la tarifa");
        }

        const data = await response.json() as GeneralTariffDTO;

        return data;
        
        
    } catch (error) {
        throw error;
    }
};