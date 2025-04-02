import { useEffect, useState } from "react";
import ModalComponent from "../../ui/ModalComponent";

import { useCompaniesListStore } from "../../../stores/admin/CompaniesStore";
import { getAllCompanies } from "../../../services/companiesService";

import GeneralTable, { Column } from "../../ui/GeneralTable";
import {
  companiesKeys,
  getTablesColumns as getTablesCompaniesColumns,
  getTablesCompaniesRows,
} from "../../../utils/tables";
import { CompanieForTable } from "../../../interfaces/types";
import { useNavigate } from "react-router";
import { Box, Flex } from "@radix-ui/themes";
import { Input } from "../../../components/ui/input";
import { SearchIcon, TrashIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Loader from "../../../components/ui/loader";

const actions = (row: any) => (
  <>
    <Button
      type="button"
      color="error"
      variant={"ghost"}
      onClick={() => console.log("Eliminar empresa")}
    >
      <TrashIcon color="red" />
    </Button>
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
        {/* <CreateCompanyModal onClose={() => setOpenModal(false)} /> */}
        <p>Modal</p>
      </ModalComponent>

      {isLoading ? (
        <Loader />
      ) : (
        <Flex direction={"column"} gap={"20px"} className="p-10">
          <Input type="text" placeholder="Buscar" icon={<SearchIcon />} />
          <Box>
            {" "}
            <Button
              color="primary"
              className="bg-transparent w-32 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white"
              onClick={() => setOpenModal(true)}
            >
              Agregar
            </Button>
          </Box>

          <GeneralTable
            columns={tableCols}
            rows={tableRows}
            onRowClick={handleRowClick}
            actions={actions}
          />
        </Flex>
      )}
    </>
  );
};

export default Companies;
