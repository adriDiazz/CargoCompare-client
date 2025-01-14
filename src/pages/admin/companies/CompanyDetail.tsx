import { Box, Paper, Typography, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { LogisticCompany } from "../../../interfaces/types";
import { getCompnanyById } from "../../../services/companiesService";
import { Details } from "@mui/icons-material";
import DetailsCard from "./DetailsCard";

interface CompanyDetailProps {
  id: string;
}

const CompanyDetail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [company, setCompany] = useState<LogisticCompany | null>(null);
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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading company details.</Typography>;
  if (!company) return <Typography>No company found.</Typography>;

  return (
    <div>
      <DetailsCard company={company} />

      <Paper>
        <Typography
          variant="h6"
          component="h2"
          sx={{ mt: 4, mb: 2, padding: 2 }}
        >
          Provedores de la empresa
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
          }}
        >
          {provedores.map((provedor) => (
            <div key={provedor.id}>
              <Typography variant="h6" component="h2">
                {provedor.supplier.name}
              </Typography>
              <Typography variant="body1" component="p">
                {provedor.supplier.description}
              </Typography>
            </div>
          ))}
        </Box>
      </Paper>
    </div>
  );
};

export default CompanyDetail;
