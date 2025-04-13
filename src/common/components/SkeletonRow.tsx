import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

export const SkeletonRow = ({ columnsLength }: { columnsLength: number }) => (
  <TableRow>
    {Array.from({ length: columnsLength }).map((_, i) => (
      <TableCell key={i}>
        <Skeleton className="h-4 w-full" />
      </TableCell>
    ))}
  </TableRow>
);
