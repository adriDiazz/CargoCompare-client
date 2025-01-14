import { Link, useLocation, useNavigate } from "react-router";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import {
  AdminVerificationFormData,
  adminVerificationSchema,
} from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Lock from "@mui/icons-material/Lock";
import { useState } from "react";
import { verifyAdminCode } from "../../services/auth";
import { Roles } from "../../interfaces/roles";

const AdminVerificationPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminVerificationFormData>({
    resolver: zodResolver(adminVerificationSchema),
  });
  let location = useLocation();
  let { email } = location.state || "";

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AdminVerificationFormData) => {
    setError(null);
    setLoading(true);

    try {
      const user = await verifyAdminCode(data.verificationCode, email);
      const userRoles = user?.authorities.map((role) => role.authority);

      if (userRoles?.includes(Roles.ADMIN)) {
        navigate("/admin");
      } else if (userRoles?.includes("USER")) {
        navigate("/home");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Box>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
              Bienvenido a CargoCompare!
            </h2>
            <Box sx={{ fontSize: "1rem" }}>
              Introduce el codigo de verification enviado al email
            </Box>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Campo de Contraseña */}
              <TextField
                {...register("verificationCode")}
                type="text"
                error={!!errors.verificationCode}
                helperText={errors.verificationCode?.message}
                variant="standard"
                placeholder="Código de verificación"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "grey.600" }} />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #E0E0E0",
                  padding: "4px 8px",
                  "& .MuiInputBase-input": {
                    padding: "8px 0",
                  },
                }}
              />

              {/* Error message */}
              {error && (
                <Box
                  sx={{
                    color: "error.main",
                    fontSize: "0.8rem",
                    textAlign: "center",
                  }}
                >
                  {error}
                </Box>
              )}
              {/* Botón de Olvidé mi Contraseña */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  sx={{
                    color: "primary.main",
                    fontSize: "0.8rem",
                    width: "100%",
                  }}
                >
                  Reenviar código
                </Button>
              </Box>

              {/* Botón de Enviar */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  borderRadius: "8px",
                  padding: "10px 20px",
                }}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AdminVerificationPage;
