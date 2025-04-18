import { useEffect, useState } from "react";
import { Column } from "../../ui/GeneralTable";
import { UserForTable } from "../../../common/interfaces/types";
import { getAllUsers } from "../../../services/userService";
import { useUserListStore } from "../../../common/stores/admin/UsersStore";
import {
  getTablesColumns,
  getTablesUserRows,
  userKeys,
} from "../../../utils/tables";

const useUsers = () => {
  const [tableCols, setTableCols] = useState<Column[]>([]);
  const [tableRows, setTableRows] = useState<UserForTable[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setUsers, users, isLoading, setLoading, addNewUser } =
    useUserListStore();

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
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const tableCols = getTablesColumns(userKeys);
      const tableRows = getTablesUserRows(users);
      setTableCols(tableCols);
      setTableRows(tableRows);
    }
  }, [users]);

  return {
    tableCols,
    tableRows,
    isLoading,
    users,
    setUsers,
    addNewUser,
    error,
  };
};

export default useUsers;
