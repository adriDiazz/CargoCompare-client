import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "phone", headerName: "Phone", width: 120 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "contactPerson", headerName: "Contact Person", width: 130 },
  { field: "contactPhone", headerName: "Contact Phone", width: 130 },
  { field: "contactEmail", headerName: "Contact Email", width: 150 },
  { field: "webSite", headerName: "Website", width: 100 },
  { field: "logo", headerName: "Logo", width: 90 },
  { field: "cif", headerName: "CIF", width: 100 },
  { field: "socialReason", headerName: "Social Reason", width: 130 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "postalCode", headerName: "Postal Code", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  { field: "province", headerName: "Province", width: 100 },
  { field: "country", headerName: "Country", width: 100 },
];

// // Dummy data for example
// const rows = [
//   {
//     id: 1,
//     name: "Logistics Inc.",
//     address: "1234 Street",
//     phone: "123-456-7890",
//     email: "info@logisticsinc.com",
//     contactPerson: "John Doe",
//     contactPhone: "321-654-0987",
//     contactEmail: "john.doe@logisticsinc.com",
//     webSite: "www.logisticsinc.com",
//     logo: "logo-url",
//     cif: "A12345678",
//     socialReason: "Logistics Services",
//     description: "Comprehensive logistics services.",
//     postalCode: "08021",
//     city: "Barcelona",
//     province: "Barcelona",
//     country: "Spain",
//   },
//   // Add more rows as needed
// ];

const Companies = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <TextField
          // {...register("verificationCode")}
          type="text"
          // error={!!errors.verificationCode}
          // helperText={errors.verificationCode?.message}
          variant="standard"
          placeholder="Buscar empresa"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "grey.600" }} />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          sx={{
            width: "70%",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #E0E0E0",
            padding: "4px 8px",
            "& .MuiInputBase-input": {
              padding: "8px 0",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              color: "white",
              fontSize: "0.8rem",
            }}
          >
            Buscar
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              color: "white",
              fontSize: "0.8rem",
            }}
          >
            Añadir Nueva
          </Button>
        </Box>
      </Box>
      <Paper
        sx={{
          height: 400,
          width: "100%",
          marginTop: "20px",
        }}
      ></Paper>
    </>
  );
};

export default Companies;
