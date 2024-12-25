import { useEffect } from "react";
import { useUserStore } from "../stores/UserStore";
import { validateSession } from "../services/auth";

export const useAuthValidation = () => {
  const { setUser, clearUser, setLoading } = useUserStore();

  useEffect(() => {
    const validate = async () => {
      setLoading(true);
      try {
        await validateSession(); // Valida la sesión con la función ya existente
      } catch {
        clearUser();
      } finally {
        setLoading(false); // Asegura que se desactive el estado de carga independientemente del resultado
      }
    };

    validate();
  }, [setUser, clearUser, setLoading]);
};
