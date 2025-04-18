import { useState } from "react";
import { CompanieForTable } from "../../../common/interfaces/types";
import { deleteCompany } from "../../../services/companiesService";
import { useCompaniesListStore } from "../../../common/stores/admin/CompaniesStore";

const useCompanyDeletingRow = () => {
  const [deletingRow, setDeletingRow] = useState<CompanieForTable | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletError, setDeletError] = useState<string | null>(null);
  const [deleteToastOpen, setDeleteToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);

  const { deleteCompanyStore } = useCompaniesListStore();

  const handleDeleteClick = (row: CompanieForTable) => {
    setDeletingRow(row);
  };

  const handleDelete = async (row: CompanieForTable) => {
    setDeleteLoading(true);
    try {
      const deleted = await deleteCompany(row.Id?.toString());

      if (deleted) {
        setDeleteToastOpen(true);
        setDeleteLoading(false);
        deleteCompanyStore(row.Id);
      } else {
        setDeletError("Error al eliminar la empresa");
        setErrorToastOpen(true);
      }
    } catch (e) {
      setDeletError("Error al eliminar la empresa");
      setErrorToastOpen(true);
      setDeleteLoading(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    deletingRow,
    setDeletingRow,
    deleteLoading,
    deletError,
    deleteToastOpen,
    setDeleteToastOpen,
    handleDeleteClick,
    handleDelete,
    errorToastOpen,
  };
};

export default useCompanyDeletingRow;
