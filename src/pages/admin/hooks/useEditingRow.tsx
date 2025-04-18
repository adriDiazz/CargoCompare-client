import { useState } from "react";
import { CompanieForTable } from "../../../common/interfaces/types";

const useEditingRow = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleEditClick = (row: CompanieForTable) => {
    setEditingRow(row);
    setIsSheetOpen(true);
  };

  return {
    editingRow,
    setEditingRow,
    isSheetOpen,
    setIsSheetOpen,
    handleEditClick,
    toastOpen,
    setToastOpen,
    errorToastOpen,
    setErrorToastOpen,
  };
};

export default useEditingRow;
