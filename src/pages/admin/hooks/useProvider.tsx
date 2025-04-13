import { useEffect, useState } from "react";
import { Supplier } from "../../../common/interfaces/types";
import { getProviderById } from "../../../services/providerService";

const useProvider = (id: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [provider, setProvider] = useState<Supplier | null>(null);

  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      try {
        const company = await getProviderById(id);
        setProvider(company);
      } catch (error) {
        if (error instanceof Error) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProvider();
    }
  }, [id]);

  return {
    loading,
    error,
    provider,
  };
};

export default useProvider;
