import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProviderDetailsForCompany } from "../../../services/companiesService";

const useProviderDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [provider, setProvider] = useState<any>(null);

  const { companyId, providerId } = useParams();

  useEffect(() => {
    const fetchCompanyProvider = async () => {
      setLoading(true);
      try {
        const company = await getProviderDetailsForCompany(
          companyId,
          providerId
        );
        setProvider(company);
      } catch (error) {
        if (error instanceof Error) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProvider();
  }, []);

  const updateProvider = async () => {
    setLoading(true);
    try {
      const updatedProvider = await getProviderDetailsForCompany(
        companyId,
        providerId
      );
      setProvider(updatedProvider);
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    provider,
    companyId,
    providerId,
    updateProvider,
  };
};

export default useProviderDetails;
