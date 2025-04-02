export const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-base font-medium">{value || "—"}</p>
  </div>
);
