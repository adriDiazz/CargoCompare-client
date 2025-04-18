import { useEffect, useState } from "react";
import { UserFullData } from "../../../common/interfaces/types";
import { getUserById } from "../../../services/userService";

function useUser(id: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<UserFullData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const user = await getUserById(id);
        setUser(user);
      } catch (error) {
        if (error instanceof Error) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  return {
    loading,
    error,
    user,
  };
}

export default useUser;
