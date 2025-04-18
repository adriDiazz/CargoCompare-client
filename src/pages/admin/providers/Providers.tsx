import { useState } from "react";

import { CompanieForTable } from "../../../common/interfaces/types";
import { useNavigate } from "react-router";

import CreateProviderModal, { fields } from "./CreateProviderModal";

import ProvidersTable from "./ProvidersTable";
import useEditingRow from "../hooks/useEditingRow";
import EditingProviderSheet from "./EditingProviderSheet";
import ConfirmDialog from "../../../common/components/ConfirmDialog";
import useProviderDeletingRow from "../hooks/useProviderDeletingRow";
import ToastMessage from "../../../common/components/ToastMessage";

const Providers = () => {
  const [openModal, setOpenModal] = useState(false);

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
  } = useProviderDeletingRow();

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

  const navigation = useNavigate();

  const handleRowClick = (row: CompanieForTable) => {
    navigation(`/admin/providers/${row.Id}`);
  };

  return (
    <>
      <CreateProviderModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        setToastOpen={setToastOpen}
      />

      <EditingProviderSheet
        open={isSheetOpen}
        row={editingRow}
        onOpenChange={setIsSheetOpen}
        fields={fields}
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

      <ProvidersTable
        handleRowClick={handleRowClick}
        setOpenModal={setOpenModal}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
    </>
  );
};

export default Providers;
