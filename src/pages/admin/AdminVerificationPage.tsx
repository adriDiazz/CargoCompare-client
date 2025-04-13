import { useLocation, useNavigate } from "react-router";

import {
  AdminVerificationFormData,
  adminVerificationSchema,
} from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { verifyAdminCode } from "../../services/auth";
import { Roles } from "../../common/interfaces/roles";
import { Box, Text } from "@radix-ui/themes";

const AdminVerificationPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AdminVerificationFormData>({
    resolver: zodResolver(adminVerificationSchema),
  });
  let location = useLocation();
  let { email } = location.state || "";

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  if (loading) console.log("hola");

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Actualiza el valor del input oculto y envía si está completo
  useEffect(() => {
    const code = codeDigits.join("");
    setValue("verificationCode", code);

    if (code.length === 6 && codeDigits.every((d) => d !== "")) {
      handleSubmit(onSubmit)();
    }
  }, [codeDigits]);

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
        console.log(error);
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
            <Box
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              {codeDigits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "1.5rem",
                    textAlign: "center",
                    border: errors.verificationCode
                      ? "1px solid red"
                      : "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </Box>
            <input type="hidden" {...register("verificationCode")} />
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AdminVerificationPage;
