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
        <div className="container mx-auto px-4 py-10">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <div className="relative">
                <SearchIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                  color="#9ca3af"
                />
                <Input placeholder="Buscar empresas..." className="pl-10" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <GeneralTable
                columns={tableCols}
                rows={tableRows}
                onRowClick={handleRowClick}
                actions={actions}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Companies;
