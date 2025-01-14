import { Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import ModalComponent from "../../ui/ModalComponent";

const Providers = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ModalComponent show={openModal} onClose={() => setOpenModal(false)}>
        <h2>f</h2>
      </ModalComponent>

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
          placeholder="Buscar proveedor"
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
            onClick={() => setOpenModal(true)}
          >
            Añadir Nueva
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Providers;
