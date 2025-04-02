import { Box } from "@radix-ui/themes";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Box
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Box
        style={{
          width: "50%",
          backgroundColor: "#075D99",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          <h2 style={{ fontSize: "3rem", fontWeight: "bold" }}>CargoCompare</h2>
          <Box style={{ fontSize: "1rem" }}>
            Compara tarifas en segundos y comparte todo un entorno de trabajo{" "}
          </Box>
        </Box>
        <Box
          style={{
            position: "absolute",
            top: "80%",
            left: "20%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            display: "flex",
          }}
        >
          <img src="/loginCircle.svg" alt="" />
        </Box>
      </Box>
      <Box
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "#F8F9FD",
        }}
      >
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
