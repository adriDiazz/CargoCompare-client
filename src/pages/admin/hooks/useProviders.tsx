import { useEffect, useState } from "react";
import { Column } from "../../ui/GeneralTable";
import { CompanieForTable } from "../../../common/interfaces/types";
import { useSuppliersListStore } from "../../../common/stores/admin/SuppliersStore";
import { getAllProviders } from "../../../services/providerService";
import {
  companiesKeys,
  getTablesColumns as getTablesCompaniesColumns,
  getTablesCompaniesRows,
} from "../../../utils/tables";

const useProviders = () => {
  const [tableCols, setTableCols] = useState<Column[]>([]);
  const [tableRows, setTableRows] = useState<CompanieForTable[]>([]);
  const { suppliers, isLoading, setLoading, setSuppliers, addNewSupplier } =
    useSuppliersListStore();

  useEffect(() => {
    const getCompanies = async () => {
      try {
        setLoading(true);
        const companies = await getAllProviders();
        setSuppliers(companies);
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

  return {
    tableCols,
    tableRows,
    isLoading,
    suppliers,
    setSuppliers,
    addNewSupplier,
  };
};

export default useProviders;
