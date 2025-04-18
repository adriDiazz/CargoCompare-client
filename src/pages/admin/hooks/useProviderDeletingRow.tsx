import { useState } from "react";
import { CompanieForTable } from "../../../common/interfaces/types";
import { deleteProvider } from "../../../services/providerService";
import { useSuppliersListStore } from "../../../common/stores/admin/SuppliersStore";

const useProviderDeletingRow = () => {
  const [deletingRow, setDeletingRow] = useState<CompanieForTable | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletError, setDeletError] = useState<string | null>(null);
  const [deleteToastOpen, setDeleteToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);

  const { deleteSupplierStore } = useSuppliersListStore();

  const handleDeleteClick = (row: CompanieForTable) => {
    setDeletingRow(row);
  };

  const handleDelete = async (row: CompanieForTable) => {
    setDeleteLoading(true);
    try {
      const deleted = await deleteProvider(row.Id?.toString());

      if (deleted) {
        setDeleteToastOpen(true);
        setDeleteLoading(false);
        deleteSupplierStore(row.Id);
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

export default useProviderDeletingRow;
