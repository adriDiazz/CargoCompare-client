import { Skeleton } from "./ui/skeleton";

const EditingCompanySheetSkeleton = () => (
  <div className="py-4 space-y-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
  </div>
);

export default EditingCompanySheetSkeleton;
