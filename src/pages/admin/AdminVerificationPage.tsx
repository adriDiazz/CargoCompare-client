import { Link, useLocation, useNavigate } from "react-router";

import {
  AdminVerificationFormData,
  adminVerificationSchema,
} from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { verifyAdminCode } from "../../services/auth";
import { Roles } from "../../interfaces/roles";
import { Box } from "@radix-ui/themes";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { LockIcon } from "lucide-react";

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
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
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
            <Box style={{ fontSize: "1rem" }}>
              Introduce el codigo de verification enviado al email
            </Box>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Campo de Contraseña */}
              <Input
                {...register("verificationCode")}
                placeholder="Código de verificación"
                icon={<LockIcon className="w-4 h-4 text-gray-500" />}
                className={errors.verificationCode ? "border-red-500" : ""}
              />
              {errors.verificationCode && (
                <span className="text-sm text-red-500 -mt-2">
                  {errors.verificationCode.message}
                </span>
              )}

              {/* Error message */}
              {error && (
                <Box
                  style={{
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
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#075D99",
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
      </Box>
    </>
  );
};

export default AdminVerificationPage;
