import { Box } from "@mui/material";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "50%",
          backgroundColor: "primary.main",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          <h2 style={{ fontSize: "3rem", fontWeight: "bold" }}>CargoCompare</h2>
          <Box sx={{ fontSize: "1rem" }}>
            Compara tarifas en segundos y comparte todo un entorno de trabajo{" "}
          </Box>
        </Box>
        <Box
          sx={{
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
        sx={{
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
