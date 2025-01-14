import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CreateProviderFormData, createProviderSchema } from "./validations";

import { useNotifications } from "@toolpad/core";
import { createProvider } from "../../../services/providerService";

interface CreateProviderModalProps {
  onClose: () => void;
  companyId: number;
}

const CreateProviderModal: React.FC<CreateProviderModalProps> = ({
  onClose,
  companyId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProviderSchema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const notifications = useNotifications();

  const onSubmit = async (data: CreateProviderFormData) => {
    setLoading(true);
    try {
      const newProvider = await createProvider(data, companyId);
      notifications.show("Proveedor creado con éxito", {
        severity: "success",
        autoHideDuration: 3000,
      });
      onClose();
      setLoading(false);
    } catch (error) {
      notifications.show("Error al crear proveedor", {
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
        width: "90%",
        maxWidth: "600px",
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
        Crear Proveedor
        <IconButton onClick={onClose} aria-label="cerrar">
          <CloseIcon />
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
                {...register(field.name)}
                error={Boolean(errors[field.name])}
                helperText={errors[field.name]?.message as ReactNode}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ position: "relative" }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
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
};

export default CreateProviderModal;

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
