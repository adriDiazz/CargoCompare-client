import { Grid, Paper, TextField } from "@mui/material";
import { LogisticCompany, Supplier } from "../../../interfaces/types";

interface DetailsCardProps {
  company: LogisticCompany | Supplier;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ company }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      {/* <Typography variant="h5" component="h4" sx={{ mb: 3 }}>
          {company.name}
        </Typography> */}

      <img
        src={company.logo}
        alt={company.name}
        style={{ width: "20%", height: "auto", marginBottom: "1rem" }}
      />

      <Grid container spacing={2}>
        {Object.entries(company).map(
          ([key, value]) =>
            key !== "id" && (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <TextField
                  size="small"
                  fullWidth
                  label={
                    key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                  }
                  value={value || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                />
              </Grid>
            )
        )}
      </Grid>
    </Paper>
  );
};

export default DetailsCard;
