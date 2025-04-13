import { SearchIcon } from "lucide-react";
import { Input } from "../../../common/components/ui/input";
import { Button } from "../../../common/components/ui/button";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/userService";
import { UserForTable, UserFullData } from "../../../common/interfaces/types";
import {
  getTablesColumns,
  getTablesUserRows,
  userKeys,
} from "../../../utils/tables";
import GeneralTable, { Column } from "../../ui/GeneralTable";
import SkeletonTable from "../../../common/components/SkeltonTable";

const Users = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserFullData[]>([]);
  const [tableCols, setTableCols] = useState<Column[]>([]);
  const [tableRows, setTableRows] = useState<UserForTable[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers();
        setUsers(response);

        const tableCols = getTablesColumns(userKeys);
        const tableRows = getTablesUserRows(response);

        setTableCols(tableCols);
        setTableRows(tableRows);
      } catch (error) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
        if (openModal && loading && error && users) {
          console.log("hola");
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      {loading ? (
        <div className="p-10">
          <SkeletonTable columns={tableCols} />
        </div>
      ) : (
        <div className=" mx-auto px-10 py-10">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <div className="flex gap-5">
                <Input
                  placeholder="Buscar usuario..."
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
                  Añadir usuario
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <GeneralTable
                columns={tableCols}
                rows={tableRows}
                // onRowClick={handleRowClick}
                // actions={actions}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
