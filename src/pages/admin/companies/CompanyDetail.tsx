import { Box, Paper, Typography, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { LogisticCompany } from "../../../interfaces/types";
import { getCompnanyById } from "../../../services/companiesService";
import { Details } from "@mui/icons-material";
import DetailsCard from "./DetailsCard";
import { Flex, Text } from "@radix-ui/themes";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";

interface CompanyDetailProps {
  id: string;
}

const CompanyDetail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [company, setCompany] = useState<LogisticCompany | null>(null);
  const navigation = useNavigate();
  const { id } = useParams();

  const provedores = company?.companySuppliers || [];

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

    fetchCompany();
  }, [id]);

  const handleItemClick = (providerId: number) => {
    navigation(`/admin/companies/${id}/provider/${providerId}`);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading company details.</Typography>;
  if (!company) return <Typography>No company found.</Typography>;

  return (
    <div>
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
