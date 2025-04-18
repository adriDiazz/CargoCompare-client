import { useState } from "react";
import UsersTable from "./UsersTable";
import { UserForTable } from "../../../common/interfaces/types";
import { useNavigate } from "react-router";
import CreateUserModal from "./CreateUserModal";
import useEditingRow from "../hooks/useEditingRow";
import EditingUserSheet from "./EditingUserSheet";
import ConfirmDialog from "../../../common/components/ConfirmDialog";
import useUserDeletingRow from "../hooks/useUserDeletingRow";
import ToastMessage from "../../../common/components/ToastMessage";

const Users = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigate();

  const {
    editingRow,
    isSheetOpen,
    setIsSheetOpen,
    handleEditClick,
    toastOpen,
    setToastOpen,
    errorToastOpen: errorEditing,
    setErrorToastOpen,
  } = useEditingRow();

  const {
    deletingRow,
    deleteLoading,
    setDeletingRow,
    deletError,
    deleteToastOpen,
    setDeleteToastOpen,
    handleDeleteClick,
    handleDelete,
    errorToastOpen: errorDelete,
  } = useUserDeletingRow();

  const handleRowClick = (row: UserForTable) => {
    navigation(`/admin/users/${row.Id}`);
  };

  return (
    <>
      <CreateUserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        setToastOpen={setToastOpen}
      />

      <EditingUserSheet
        open={isSheetOpen}
        row={editingRow}
        onOpenChange={setIsSheetOpen}
        fields={[
          { name: "name", label: "Name" },
          { name: "lastName", label: "Last Name" },
          { name: "email", label: "Email" },
          { name: "role", label: "Role", type: "select" },
          { name: "state", label: "State", type: "select" },
        ]}
        setErrorToastOpen={setErrorToastOpen}
        setToastOpen={setToastOpen}
      />

      <ConfirmDialog
        open={!!deletingRow}
        onOpenChange={() => {
          setDeletingRow(null);
        }}
        title="Eliminar empresa"
        description="¿Estás seguro de que deseas eliminar esta empresa? Esta acción no se puede deshacer."
        onConfirm={() => {
          handleDelete(deletingRow!);
        }}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        loading={deleteLoading}
        error={deletError}
      />

      <ToastMessage setToastOpen={setToastOpen} toastOpen={toastOpen} />
      <ToastMessage
        setToastOpen={setDeleteToastOpen}
        toastOpen={deleteToastOpen}
        message="Empresa eliminada correctamente"
      />
      <ToastMessage
        setToastOpen={setErrorToastOpen}
        toastOpen={errorDelete || errorEditing}
        message={"Error al realizar la acción"}
        isError
      />

      <UsersTable
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleRowClick={handleRowClick}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default Users;
