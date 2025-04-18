import { useState } from "react";
import { useUserListStore } from "../../../common/stores/admin/UsersStore";
import { UserForTable } from "../../../common/interfaces/types";
import { deleteUser } from "../../../services/userService";

const useUserDeletingRow = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletError, setDeletError] = useState<string | null>(null);
  const [deleteToastOpen, setDeleteToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);
  const [deletingRow, setDeletingRow] = useState<UserForTable | null>(null);

  const { deleteUserStore } = useUserListStore();

  const handleDeleteClick = (row: UserForTable) => {
    setDeletingRow(row);
  };

  const handleDelete = async (row: UserForTable) => {
    setDeleteLoading(true);
    try {
      const deleted = await deleteUser(row.Id?.toString());

      if (deleted) {
        setDeleteToastOpen(true);
        setDeleteLoading(false);
        deleteUserStore(row.Id);
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

export default useUserDeletingRow;
