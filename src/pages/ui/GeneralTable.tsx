import React, { ReactNode } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../common/components/ui/table";

import { cn } from "../../lib/utils";
import { Avatar, AvatarImage } from "../../common/components/ui/avatar";

import { Badge } from "../../common/components/ui/badge";
import { State } from "../../common/interfaces/types";

export interface Column {
  id: string;
  label: string;
  minWidth: number;
  align?: "right" | "left" | "center";
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
  const [rowsPerPage, _] = React.useState(10);

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className={cn(
                  column.align === "right" && "text-right",
                  column.align === "center" && "text-center",
                  `min-w-[${column.minWidth}px]`
                )}
              >
                {column.label}
              </TableHead>
            ))}
            {actions && <TableHeader className="text-center"></TableHeader>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedRows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={cn(
                "cursor-pointer",
                onRowClick && "hover:bg-muted/60"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className={cn(
                    column.align === "right" && "text-right",
                    column.align === "center" && "text-center"
                  )}
                >
                  {column.id === "Rol" &&
                    Array.isArray(row[column.id as keyof T]) &&
                    (row[column.id as keyof T] as string[]).map(
                      (rol, index) => (
                        <Badge
                          key={index}
                          className="mr-1 mt-1"
                          variant="secondary"
                        >
                          {rol}
                        </Badge>
                      )
                    )}

                  {column.id === "Estado" && (
                    <Badge
                      className={
                        row[column.id] === State.ACTIVE
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : row[column.id] === State.INACTIVE
                            ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            : row[column.id] === State.PENDING
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {row[column.id] === State.ACTIVE
                        ? "Activo"
                        : row[column.id] === State.INACTIVE
                          ? "Inactivo"
                          : row[column.id] === State.PENDING
                            ? "Pendiente"
                            : "Eliminado"}
                    </Badge>
                  )}
                  {column.id === "Logo" && (
                    <Avatar>
                      <AvatarImage
                        src={row[column.id as keyof T] as string}
                        width={40}
                        height={40}
                      />
                    </Avatar>
                  )}

                  {column.id !== "Logo" &&
                    column.id !== "Rol" &&
                    column.id !== "Estado" &&
                    (row[column.id as keyof T] as ReactNode)}
                </TableCell>
              ))}
              {actions && (
                <TableCell className="text-center">{actions(row)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginación simple, puedes mejorarla o hacerla aparte si prefieres */}
      <div className="flex items-center justify-between p-4 text-sm">
        <span>
          Página {page + 1} de {Math.ceil(rows.length / rowsPerPage)}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            disabled={(page + 1) * rowsPerPage >= rows.length}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralTable;
