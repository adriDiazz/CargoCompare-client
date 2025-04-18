import { MoreHorizontal, SearchIcon } from "lucide-react";
import SkeletonTable from "../../../common/components/SkeltonTable";
import { Button } from "../../../common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../common/components/ui/dropdown-menu";
import { CompanieForTable } from "../../../common/interfaces/types";
import useProviders from "../hooks/useProviders";
import { Input } from "../../../common/components/ui/input";
import GeneralTable from "../../ui/GeneralTable";

const ProvidersTable = ({
  handleRowClick,
  handleEditClick,
  handleDeleteClick,
  setOpenModal,
}) => {
  const { isLoading, tableCols, tableRows } = useProviders();
  const renderActions = (row: CompanieForTable) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Acciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem onClick={() => handleRowClick(row)}>
          Ver detalles
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEditClick(row)}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => handleDeleteClick(row)}
        >
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  return (
    <>
      {isLoading ? (
        <div className="p-10">
          <SkeletonTable columns={tableCols} />
        </div>
      ) : (
        <div className=" mx-auto px-10 py-10">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <div className="flex gap-5">
                <Input
                  placeholder="Buscar proveedores..."
                  className="pl-10"
                  icon={
                    <SearchIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                      color="#9ca3af"
                    />
                  }
                />
                <Button
                  variant="outline"
                  className=""
                  onClick={() => setOpenModal(true)}
                >
                  Añadir provedor
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <GeneralTable
                columns={tableCols}
                rows={tableRows}
                onRowClick={handleRowClick}
                actions={renderActions}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProvidersTable;
