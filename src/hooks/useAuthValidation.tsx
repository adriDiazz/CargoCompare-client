import { useEffect } from "react";
import { useUserStore } from "../stores/UserStore";
import { validateSession } from "../services/auth";

export const useAuthValidation = () => {
  const { setUser, clearUser, setLoading } = useUserStore();

  useEffect(() => {
    const validate = async () => {
      setLoading(true);
      try {
        await validateSession();
      } catch {
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, [setUser, clearUser, setLoading]);
};
