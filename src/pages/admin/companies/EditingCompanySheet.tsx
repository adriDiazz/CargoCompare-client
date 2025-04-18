import { useForm } from "react-hook-form";
import EditingCompanySheetSkeleton from "../../../common/components/EdintingCompanySheetSkeleton";
import { Button } from "../../../common/components/ui/button";
import { ScrollArea } from "../../../common/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../../common/components/ui/sheet";
import { CompanieForTable } from "../../../common/interfaces/types";
import useCompany from "../hooks/useCompany";

import { CreateCompanyFormData, createCompanySchema } from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { updateCompany } from "../../../services/companiesService";
import { useCompaniesListStore } from "../../../common/stores/admin/CompaniesStore";
import { Loader2 } from "lucide-react";
import { Text } from "@radix-ui/themes";

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

const EditingCompanySheet = ({
  open,
  row,
  onOpenChange,
  fields,
  setErrorToastOpen,
  setToastOpen,
}: Props) => {
  const { Id } = row || {};
  const { loading, error, company } = useCompany(Id?.toString() || "");
  const [editingLoading, setEditingLoading] = useState(false);
  const [editingError, setEditingError] = useState<string | null>(null);
  const { updateCompanyStore } = useCompaniesListStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CreateCompanyFormData) => {
    setEditingLoading(true);
    try {
      const updatedCompany = await updateCompany(row?.Id?.toString(), data);
      updateCompanyStore(updatedCompany);
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
    if (company) {
      reset({
        name: company.name || "",
        socialReason: company.socialReason || "",
        cif: company.cif || "",
        webSite: company.webSite || "",
        email: company.email || "",
        phone: company.phone || "",
        contactPerson: company.contactPerson || "",
        contactPhone: company.contactPhone || "",
        contactEmail: company.contactEmail || "",
        logo: company.logo || "",
        address: company.address || "",
        postalCode: company.postalCode || "",
        city: company.city || "",
        province: company.province || "",
        country: company.country || "",
        description: company.description || "",
      });
    }
  }, [company, reset]);

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
              form="edit-company-form"
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
              id="edit-company-form"
            >
              {fields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="block text-sm text-muted-foreground">
                    {field.label}
                  </label>

                  <input
                    {...register(field.name as keyof CreateCompanyFormData)}
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
};

export default EditingCompanySheet;
