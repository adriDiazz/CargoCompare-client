import { useEffect, useState } from "react";
import { CompanieForTable } from "../../../common/interfaces/types";
import useProvider from "../hooks/useProvider";
import { useSuppliersListStore } from "../../../common/stores/admin/SuppliersStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProviderFormData, createProviderSchema } from "./validations";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../../common/components/ui/sheet";
import { Button } from "../../../common/components/ui/button";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "../../../common/components/ui/scroll-area";
import EditingCompanySheetSkeleton from "../../../common/components/EdintingCompanySheetSkeleton";
import { Text } from "@radix-ui/themes";
import { updateProvider } from "../../../services/providerService";

interface Props {
  open: boolean;
  row: CompanieForTable | null;
  onOpenChange: (open: boolean) => void;
  fields: {
    name: string;
    label: string;
    type?: string;
    md?: number;
  }[];
  setErrorToastOpen: (open: boolean) => void;
  setToastOpen: (open: boolean) => void;
}

function EditingProviderSheet({
  open,
  row,
  onOpenChange,
  fields,
  setErrorToastOpen,
  setToastOpen,
}: Props) {
  const { Id } = row || {};
  const { loading, error, provider } = useProvider(Id?.toString() || "");
  const [editingLoading, setEditingLoading] = useState(false);
  const [editingError, setEditingError] = useState<string | null>(null);
  const { updateSupplierStore } = useSuppliersListStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProviderFormData>({
    resolver: zodResolver(createProviderSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CreateProviderFormData) => {
    setEditingLoading(true);
    try {
      const updatedCompany = await updateProvider(row?.Id?.toString(), data);
      updateSupplierStore(updatedCompany);
      setToastOpen(true);
      onOpenChange(false);
    } catch (e) {
      setEditingError("Error al crear la empresa");
      setErrorToastOpen(true);
    } finally {
      setEditingLoading(false);
    }
  };

  useEffect(() => {
    if (provider) {
      reset({
        name: provider.name || "",
        socialReason: provider.socialReason || "",
        cif: provider.cif || "",
        webSite: provider.webSite || "",
        email: provider.email || "",
        phone: provider.phone || "",
        contactPerson: provider.contactPerson || "",
        contactPhone: provider.contactPhone || "",
        contactEmail: provider.contactEmail || "",
        logo: provider.logo || "",
        address: provider.address || "",
        postalCode: provider.postalCode || "",
        city: provider.city || "",
        province: provider.province || "",
        country: provider.country || "",
        description: provider.description || "",
      });
    }
  }, [provider, reset]);

  const correctedFields = fields.filter((field) => field.name !== "companyId");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>
            {row ? `Detalles de ${row.Nombre}` : "Sin empresa"}
          </SheetTitle>
          <SheetDescription>
            <Button
              variant="outline"
              size="sm"
              style={{
                width: "100%",
              }}
              form="edit-provider-form"
              type="submit"
            >
              <>{editingLoading ? <Loader2 /> : "Guardar"}</>
            </Button>
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full w-full">
          {error && (
            <div className="text-red-600 mt-4">
              Error al cargar los detalles.
            </div>
          )}
          {loading ? (
            <EditingCompanySheetSkeleton />
          ) : (
            <form
              className="py-4"
              onSubmit={handleSubmit(onSubmit)}
              id="edit-provider-form"
            >
              {correctedFields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="block text-sm text-muted-foreground">
                    {field.label}
                  </label>

                  <input
                    {...register(field.name as keyof CreateProviderFormData)}
                    type={field.type || "text"}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[field.name]?.message as string}
                    </p>
                  )}
                </div>
              ))}
            </form>
          )}

          {editingError && (
            <div className="text-red-600 mt-4">
              <Text>Ha ocurrido un error</Text>
            </div>
          )}
        </ScrollArea>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cerrar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default EditingProviderSheet;
