import { useEffect, useState } from "react";
import { State, UserForTable } from "../../../common/interfaces/types";
import useUser from "../hooks/useUser";
import { useUserListStore } from "../../../common/stores/admin/UsersStore";
import { Controller, useForm } from "react-hook-form";
import { CreateUserFormData, createUserSchema } from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "../../../services/userService";
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
import { ScrollArea } from "../../../common/components/ui/scroll-area";
import EditingCompanySheetSkeleton from "../../../common/components/EdintingCompanySheetSkeleton";
import { Text } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../common/components/ui/select";

interface Props {
  open: boolean;
  row: UserForTable | null;
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

const EditingUserSheet = ({
  open,
  row,
  onOpenChange,
  fields,
  setErrorToastOpen,
  setToastOpen,
}: Props) => {
  const { Id } = row || {};
  const { loading, error, user } = useUser(Id?.toString() || "");
  const [editingLoading, setEditingLoading] = useState(false);
  const [editingError, setEditingError] = useState<string | null>(null);
  const { updateUserStore } = useUserListStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CreateUserFormData) => {
    setEditingLoading(true);
    try {
      const updatedCompany = await updateUser(row?.Id?.toString(), data);
      updateUserStore(updatedCompany);
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
    if (user) {
      console.log(
        "user",
        user.authorities
          .filter((auth) => auth.authority.startsWith("ROLE_"))[0]
          ?.authority.split("_")[1] || ""
      );
      reset({
        name: user.name || "",
        lastName: user.lastName || "",
        email: user.email || "",
        role:
          user.authorities
            .filter((auth) => auth.authority.startsWith("ROLE_"))[0]
            ?.authority.split("_")[1] || "",

        state: user.state || "",
      });
    }
  }, [user, reset]);

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

                  {field.type === "select" && field.name !== "state" && (
                    <Controller
                      control={control}
                      name="role"
                      render={({ field: controllerField }) => (
                        <Select
                          value={controllerField.value}
                          onValueChange={controllerField.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                            <SelectItem value="MANAGER">MANAGER</SelectItem>
                            <SelectItem value="USER">USER</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  )}

                  {field.name === "state" && (
                    <Controller
                      control={control}
                      name="state"
                      render={({ field: controllerField }) => (
                        <Select
                          value={controllerField.value}
                          onValueChange={controllerField.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={State.ACTIVE}>Activo</SelectItem>
                            <SelectItem value={State.INACTIVE}>
                              Inactivo
                            </SelectItem>
                            <SelectItem value={State.SUSPENDED}>
                              Suspendido
                            </SelectItem>
                            <SelectItem value={State.PENDING}>
                              Pendiente
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  )}

                  {field.type !== "select" && (
                    <input
                      {...register(field.name as keyof CreateUserFormData)}
                      type={field.type || "text"}
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  )}

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

export default EditingUserSheet;
