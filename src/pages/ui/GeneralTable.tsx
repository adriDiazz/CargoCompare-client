import React, { ReactNode } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Avatar,
} from "@mui/material";

export interface Column {
  id: string;
  label: string;
  minWidth: number;
  align: "right" | "left" | "center";
}

interface GeneralTableProps<T> {
  columns: Column[];
  rows: T[];
  onRowClick?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
}

const GeneralTable = <T,>({
  columns,
  rows,
  onRowClick,
  actions,
}: GeneralTableProps<T>) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper style={{ width: "100%", overflow: "auto", height: "100%" }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {actions && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align || "left"}>
                      {column.id === "Logo" ? (
                        <Avatar
                          src={row[column.id as keyof T] as unknown as string} // Cast para asegurar el tipo
                          alt="Logo"
                          style={{ width: 50, height: 50 }}
                        />
                      ) : (
                        (row[column.id as keyof T] as ReactNode) // Fix: Add type assertion as ReactNode
                      )}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell align="center">{actions(row)}</TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default GeneralTable;
