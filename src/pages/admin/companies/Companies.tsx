import { Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, Paper, TextField } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useEffect, useState } from "react";
import ModalComponent from "../../ui/ModalComponent";
import CreateCompanyModal from "./CreateCompanyModal";
import { useCompaniesListStore } from "../../../stores/admin/CompaniesStore";
import { getAllCompanies } from "../../../services/companiesService";
import AdminLayout from "../AdminLayout";

import GeneralTable, { Column } from "../../ui/GeneralTable";
import {
  companiesKeys,
  getTablesColumns as getTablesCompaniesColumns,
  getTablesCompaniesRows,
} from "../../../utils/tables";
import { CompanieForTable } from "../../../interfaces/types";
import { useNavigate } from "react-router";

const actions = (row: any) => (
  <>
    <Button
      variant="text"
      color="error"
      startIcon={<DeleteOutlineOutlinedIcon sx={{ color: "red" }} />}
      sx={{
        color: "white",
        fontSize: "0.8rem",
      }}
      onClick={() => console.log("Eliminar empresa")}
    ></Button>
  </>
);

const Companies = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tableCols, setTableCols] = useState<Column[]>([]);
  const [tableRows, setTableRows] = useState<CompanieForTable[]>([]);
  const { setCompanies, companies, isLoading, setLoading } =
    useCompaniesListStore();
  const navigation = useNavigate();

  useEffect(() => {
    const getCompanies = async () => {
      // Lógica de obtener las empresas
      try {
        setLoading(true);
        const companies = await getAllCompanies();
        setCompanies(companies);
        const tableCols = getTablesCompaniesColumns(companiesKeys);
        const tableRows = getTablesCompaniesRows(companies);
        setTableCols(tableCols);
        setTableRows(tableRows);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getCompanies();
  }, []);

  useEffect(() => {
    const tableCols = getTablesCompaniesColumns(companiesKeys);
    const tableRows = getTablesCompaniesRows(companies);
    setTableCols(tableCols);
    setTableRows(tableRows);
  }, [companies]);

  const handleRowClick = (row: CompanieForTable) => {
    navigation(`/admin/companies/${row.Id}`);
  };

  return (
    <>
      <ModalComponent show={openModal} onClose={() => setOpenModal(false)}>
        <CreateCompanyModal onClose={() => setOpenModal(false)} />
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
          placeholder="Buscar empresa"
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
      <Paper
        sx={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        {/* tabla de empresas */}

        {isLoading && <p>Cargando...</p>}

        <GeneralTable
          columns={tableCols}
          rows={tableRows}
          onRowClick={handleRowClick}
          actions={actions}
        />
      </Paper>
    </>
  );
};

export default Companies;
