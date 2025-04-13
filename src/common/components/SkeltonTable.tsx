import { Column } from "../../pages/ui/GeneralTable";
import { SkeletonRow } from "./SkeletonRow";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";

const SkeletonTable = ({ columns }: { columns: Column[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.id} className="font-semibold">
              <Skeleton className="h-4 w-24" />
            </TableCell>
          ))}
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonRow key={i} columnsLength={columns.length + 1} />
        ))}
      </TableBody>
    </Table>
  );
};

export default SkeletonTable;
