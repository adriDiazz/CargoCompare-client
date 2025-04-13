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
            {actions && (
              <TableHeader className="text-center">Acciones</TableHeader>
            )}
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
                  {column.id === "Logo" ? (
                    <Avatar>
                      <AvatarImage
                        src={row[column.id as keyof T] as string}
                        width={40}
                        height={40}
                      />
                    </Avatar>
                  ) : (
                    (row[column.id as keyof T] as ReactNode)
                  )}
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
