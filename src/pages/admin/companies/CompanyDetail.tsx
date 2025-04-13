import { useNavigate, useParams } from "react-router";

import DetailsCard from "./DetailsCard";
import { Box, Flex, Text } from "@radix-ui/themes";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../common/components/ui/card";
import { Avatar, AvatarImage } from "../../../common/components/ui/avatar";
import Loader from "../../../common/components/ui/loader";
import useCompany from "../hooks/useCompany";

const CompanyDetail = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const { loading, error, company } = useCompany(id || "");

  const provedores = company?.companySuppliers || [];

  const handleItemClick = (providerId: number) => {
    navigation(`/admin/companies/${id}/provider/${providerId}`);
  };

  if (loading) return <Loader />;
  if (error) return <Text>Error loading company details.</Text>;
  if (!company) return <Text>No company found.</Text>;

  return (
    <div>
      {" "}
      <DetailsCard company={company} />
      <div className="p-10">
        <Text size={"6"}>Provedores de la empresa</Text>

        <Flex direction={"column"} className="mt-5">
          {provedores.map((provedor) => (
            <Card
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => handleItemClick(provedor.supplier.id)}
              key={provedor.supplier.id}
            >
              <CardHeader>
                <Flex gap="3" align="center">
                  <Avatar>
                    <AvatarImage src={provedor.supplier.logo} />
                  </Avatar>
                  <Box>
                    {" "}
                    <CardTitle>{provedor.supplier.name}</CardTitle>
                    <CardDescription>
                      {provedor.supplier.description}
                    </CardDescription>
                  </Box>
                </Flex>
              </CardHeader>
            </Card>
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default CompanyDetail;
