import { useEffect, useState } from "react";
import { LogisticCompany } from "../../../common/interfaces/types";
import { getCompnanyById } from "../../../services/companiesService";

const useCompany = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [company, setCompany] = useState<LogisticCompany | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      try {
        const company = await getCompnanyById(id);
        setCompany(company);
      } catch (error) {
        if (error instanceof Error) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchCompany();
    }
  }, [id]);
  return {
    loading,
    error,
    company,
  };
};

export default useCompany;
