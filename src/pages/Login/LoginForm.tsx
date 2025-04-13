import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"; // Asegúrate de usar 'react-router-dom'
import { loginSchema } from "./validations";
import { z } from "zod";
import { login } from "../../services/auth";
import { useState } from "react";
import { Roles } from "../../common/interfaces/roles";
import { Box, Text } from "@radix-ui/themes";
import { Button } from "../../common/components/ui/button";
import { Input } from "../../common/components/ui/input";
import { Lock, SendIcon } from "lucide-react";
import Loader from "../../common/components/ui/loader";

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

      if (typeof user === "string") {
        console.log(user);
        if (user === Roles.ADMIN) {
          navigate("/admin-verification", { state: { email: data.email } });
        }
      } else {
        const userRoles = user.authorities.map((role) => role.authority);

        if (userRoles.includes(Roles.ADMIN)) {
          navigate("/admin");
        } else if (userRoles.includes(Roles.USER)) {
          navigate("/home");
        } else if (userRoles.includes(Roles.MANAGER)) {
          navigate("/manager");
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
        <Text
          style={{
            color: "red",
            fontSize: "1rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {error}
        </Text>
      )}
      {loading && <Loader />}
      <Box></Box>
      <Box
        style={{
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
          <Box style={{ fontSize: "1rem" }}>Inicia sesión para continuar</Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Campo de Email */}
            <Input
              {...register("email")}
              placeholder="Email"
              icon={<SendIcon className="w-4 h-4 text-gray-500" />}
              className={errors.email ? "border-red-500" : ""}
            />

            {errors.email && (
              <span className="text-sm text-red-500 -mt-2">
                {errors.email.message}
              </span>
            )}

            {/* Campo de Contraseña */}
            <Input
              {...register("password")}
              type="password"
              placeholder="Contraseña"
              icon={<Lock className="w-4 h-4 text-gray-500" />}
              className={errors.password ? "border-red-500" : ""}
            />

            {errors.email && (
              <span className="text-sm text-red-500 -mt-2">
                {errors.password?.message}
              </span>
            )}

            {/* Botón de Olvidé mi Contraseña */}
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant={"link"}
                style={{
                  color: "#075D99",
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
              style={{
                backgroundColor: "#075D99",
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
