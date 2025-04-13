import { useEffect, useState } from "react";
import { useCompaniesListStore } from "../../../common/stores/admin/CompaniesStore";
import { Column } from "../../ui/GeneralTable";
import { CompanieForTable } from "../../../common/interfaces/types";
import { getAllCompanies } from "../../../services/companiesService";
import {
  companiesKeys,
  getTablesColumns as getTablesCompaniesColumns,
  getTablesCompaniesRows,
} from "../../../utils/tables";

const useCompanies = () => {
  const [tableCols, setTableCols] = useState<Column[]>([]);
  const [tableRows, setTableRows] = useState<CompanieForTable[]>([]);
  const { setCompanies, companies, isLoading, setLoading } =
    useCompaniesListStore();

  useEffect(() => {
    const getCompanies = async () => {
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

  return {
    tableCols,
    tableRows,
    companies,
    isLoading,
    setLoading,
  };
};

export default useCompanies;
