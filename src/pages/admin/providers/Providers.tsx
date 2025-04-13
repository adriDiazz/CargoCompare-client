import { useState } from "react";
import { Input } from "../../../common/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "../../../common/components/ui/button";

import GeneralTable from "../../ui/GeneralTable";

import useProviders from "../hooks/useProviders";
import { CompanieForTable } from "../../../common/interfaces/types";
import { useNavigate } from "react-router";

import CreateProviderModal from "./CreateProviderModal";
import SkeletonTable from "../../../common/components/SkeltonTable";

const Providers = () => {
  const [openModal, setOpenModal] = useState(false);
  const { isLoading, tableCols, tableRows } = useProviders();
  const navigation = useNavigate();

  const handleRowClick = (row: CompanieForTable) => {
    navigation(`/admin/providers/${row.Id}`);
  };

  return (
    <>
      <CreateProviderModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
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
                // actions={actions}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Providers;
