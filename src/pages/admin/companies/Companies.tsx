import { useState } from "react";

import { CompanieForTable } from "../../../common/interfaces/types";
import { useNavigate } from "react-router";

import CreateCompanyModal, { fields } from "./CreateCompanyModal";

import EditingCompanySheet from "./EditingCompanySheet";
import ConfirmDialog from "../../../common/components/ConfirmDialog";

import CompaniesTable from "./CompaniesTable";
import ToastMessage from "../../../common/components/ToastMessage";
import useCompanyDeletingRow from "../hooks/useCompanyDeletingRow";
import useEditingRow from "../hooks/useEditingRow";

const Companies = () => {
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
  } = useCompanyDeletingRow();

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
    navigation(`/admin/companies/${row.Id}`);
  };

  return (
    <>
      <CreateCompanyModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        setToastOpen={setToastOpen}
      />

      <EditingCompanySheet
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

      <CompaniesTable
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleRowClick={handleRowClick}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default Companies;
