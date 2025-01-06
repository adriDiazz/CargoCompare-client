import { zodResolver } from "@hookform/resolvers/zod";
import { EmailOutlined, Lock } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; // Asegúrate de usar 'react-router-dom'
import { loginSchema } from "./validations";
import { z } from "zod";
import { login } from "../../services/auth";
import { useState } from "react";
import { Roles } from "../../interfaces/roles";

export type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setError(null); // Limpiar errores previos
    setLoading(true);

    try {
      const user = await login(data);
      console.log(user);

      if (typeof user === "string") {
        console.log(user);
        if (user === Roles.ADMIN) {
          navigate("/admin-verification", { state: { email: data.email } });
        }
      } else {
        const userRoles = user.authorities.map((role) => role.authority);

        // if (!userRoles.includes("USER")) {
        //   throw new Error("No tienes permisos para acceder a esta aplicación.");
        // }

        if (userRoles.includes(Roles.ADMIN)) {
          navigate("/admin");
        } else if (userRoles.includes("USER")) {
          navigate("/home");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Mostrar el mensaje de error al usuario
      }
    } finally {
      setLoading(false); // Asegurar que se desactive el estado de carga
    }
  };

  return (
    <>
      {error && (
        <Box
          sx={{
            backgroundColor: "error.main",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </Box>
      )}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            Cargando...
          </Box>
        </Box>
      )}
      <Box></Box>
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
          <Box sx={{ fontSize: "1rem" }}>Inicia sesión para continuar</Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Campo de Email */}
            <TextField
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="standard"
              placeholder="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={{ color: "grey.600" }} />
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

            {/* Campo de Contraseña */}
            <TextField
              {...register("password")}
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="standard"
              placeholder="Contraseña"
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
                component={Link}
                to="/forgot-password"
                sx={{
                  color: "primary.main",
                  fontSize: "0.8rem",
                  width: "100%",
                }}
              >
                Olvide la Contraseña
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
    </>
  );
};

export default LoginForm;
