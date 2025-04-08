import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { useParams } from "react-router";
import { getProviderDetailsForCompany } from "../../../services/companiesService";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { GeneralTariffs } from "../../../interfaces/types";
import DetailsCard from "./DetailsCard";
import TariffTab from "./TariffTab";

const CompanyProviderDetail = () => {
  const { companyId, providerId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [provider, setProvider] = useState<any>(null);

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

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error loading company details.</p>;

  return (
    <>
      <div className="p-10">
        <Tabs defaultValue="data" className="w-full">
          <TabsList>
            <TabsTrigger value="data">Datos Basicos</TabsTrigger>
            <TabsTrigger value="tariff">Tarifas</TabsTrigger>
          </TabsList>

          <TabsContent value="data">
            <DetailsCard company={provider} />
          </TabsContent>

          <TabsContent value="tariff">
            <TariffTab generalTariffs={provider?.generalTariffs} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CompanyProviderDetail;
