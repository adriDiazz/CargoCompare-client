import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { CreateCompanyFormData, createCompanySchema } from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCompany } from "../../../services/companiesService";
import { useState } from "react";
import { useNotifications } from "@toolpad/core";
import { useCompaniesListStore } from "../../../stores/admin/CompaniesStore";

export default function CreateCompanyModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const notifications = useNotifications();
  const { addNewCompany } = useCompaniesListStore();

  const onSubmit = async (data: CreateCompanyFormData) => {
    try {
      setLoading(true);
      const createdCompany = await createCompany(data);
      addNewCompany(createdCompany);
      setLoading(false);
      onClose();
      notifications.show("Consider yourself notified!", {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      setError("Error al crear la empresa");
      notifications.show("Error al crear la empresa", {
        severity: "error",
        autoHideDuration: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        width: "90%", // Aumentar el ancho para adaptarse a más campos
        maxWidth: "60%", // Aumentar el ancho máximo
        backgroundColor: "white",
        borderRadius: "8px",
        margin: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Crear Empresa Logística
        <IconButton onClick={onClose} aria-label="cerrar">
          <GridCloseIcon />
        </IconButton>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} md={field.md} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                variant="outlined"
                size="small"
                type={field.type || "text"}
                {...register(field.name as keyof CreateCompanyFormData)} // Cast field.name to keyof CreateCompanyFormData
                error={Boolean(errors[field.name])}
                helperText={errors[field.name]?.message}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                color: "white",
                fontSize: "0.8rem",
                position: "relative", // Posiciona el CircularProgress correctamente
              }}
              disabled={loading} // Deshabilita el botón mientras se carga
            >
              {loading ? (
                <CircularProgress
                  size={24} // Tamaño del loader
                  sx={{
                    color: "white", // Color del loader para que sea visible sobre el botón
                    position: "absolute", // Asegura que el loader se posicione correctamente
                    top: "50%", // Centra verticalmente
                    left: "50%", // Centra horizontalmente
                    marginTop: "-12px", // Ajusta la posición vertical debido al tamaño
                    marginLeft: "-12px", // Ajusta la posición horizontal debido al tamaño
                  }}
                />
              ) : (
                "Crear"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

// Definición de campos para simplificar y evitar repetición
const fields = [
  { name: "name", label: "Nombre de la empresa", md: 6 },
  { name: "socialReason", label: "Razón Social", md: 6 },
  { name: "cif", label: "CIF", md: 6 },
  { name: "webSite", label: "Sitio web", type: "url", md: 6 },
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
    md: 6,
  },
  { name: "phone", label: "Teléfono", type: "tel", md: 6 },
  { name: "contactPerson", label: "Persona de contacto", md: 6 },
  {
    name: "contactPhone",
    label: "Teléfono de contacto",
    type: "tel",
    md: 6,
  },
  { name: "contactEmail", label: "Email de contacto", type: "email", md: 6 },
  { name: "logo", label: "Logo", md: 6 },
  { name: "address", label: "Dirección", md: 12 },
  { name: "postalCode", label: "Código Postal", md: 4 },
  { name: "city", label: "Ciudad", md: 4 },
  { name: "province", label: "Provincia", md: 4 },
  { name: "country", label: "País", md: 6 },
  { name: "description", label: "Descripción", md: 6, type: "textarea" },
];
