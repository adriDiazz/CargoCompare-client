import { useState } from "react";
import GeneralTable from "../../ui/GeneralTable";
import { CompanieForTable } from "../../../common/interfaces/types";
import { useNavigate } from "react-router";
import { Input } from "../../../common/components/ui/input";
import { SearchIcon, TrashIcon } from "lucide-react";
import { Button } from "../../../common/components/ui/button";
import Loader from "../../../common/components/ui/loader";
import useCompanies from "../hooks/useCompanies";
import CreateCompanyModal from "./CreateCompanyModal";

const actions = () => (
  <>
    <Button
      type="button"
      color="error"
      variant={"ghost"}
      onClick={() => console.log("Eliminar empresa")}
    >
      <TrashIcon color="red" />
    </Button>
  </>
);

const Companies = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigate();

  const { isLoading, tableCols, tableRows } = useCompanies();

  const handleRowClick = (row: CompanieForTable) => {
    navigation(`/admin/companies/${row.Id}`);
  };

  return (
    <>
      <CreateCompanyModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <div className=" mx-auto px-10 py-10">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <div className="flex gap-5">
                <Input
                  placeholder="Buscar empresas..."
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
                  Añadir empresa
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <GeneralTable
                columns={tableCols}
                rows={tableRows}
                onRowClick={handleRowClick}
                actions={actions}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Companies;
