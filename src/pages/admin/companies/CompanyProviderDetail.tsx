import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../common/components/ui/tabs";

import DetailsCard from "./DetailsCard";
import TariffTab from "./TariffTab";
import useProviderDetails from "../hooks/useProviderDetails";
import { useTabStore } from "../../../common/stores/admin/TariffTabsStore";
import Loader from "../../../common/components/ui/loader";

const CompanyProviderDetail = () => {
  const { loading, error, provider, companyId, providerId, updateProvider } =
    useProviderDetails();

  const { activeTab, setActiveTab } = useTabStore();

  if (error) return <p>Error loading company details.</p>;

  return (
    <>
      <div className="p-10">
        {loading ? (
          <Loader />
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="data">Datos Basicos</TabsTrigger>
              <TabsTrigger value="tariff">Tarifas</TabsTrigger>
            </TabsList>

            <TabsContent value="data">
              <DetailsCard company={provider} />
            </TabsContent>

            <TabsContent value="tariff">
              <TariffTab
                generalTariffs={provider?.generalTariffs}
                companyId={companyId}
                providerId={providerId}
                updateProvider={updateProvider}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </>
  );
};

export default CompanyProviderDetail;
