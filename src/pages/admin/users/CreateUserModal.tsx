import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import { useState } from "react";
import { createCompany } from "../../../services/companiesService";

import { Button } from "../../../common/components/ui/button";
import { useUserListStore } from "../../../common/stores/admin/UsersStore";
import { CreateUserFormData, createUserSchema } from "./validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../common/components/ui/select";

export const fields = [
  { name: "name", label: "Nombre", md: 6 },
  { name: "apellido", label: "Apellido", md: 6 },
  { name: "email", label: "Correo electrónico", type: "email", md: 6 },
  { name: "role", label: "Rol", type: "select", md: 6 },
];

interface CreateCompanyModalProps {
  open: boolean;
  onClose: () => void;
  setToastOpen: (open: boolean) => void;
}

export default function CreateUserModal({
  open,
  onClose,
  setToastOpen,
}: CreateCompanyModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addNewUser } = useUserListStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CreateUserFormData) => {
    setLoading(true);
    try {
      //   const createdCompany = await createCompany(data);
      //   setToastOpen(true);
      //   addNewUser(createdCompany);
      onClose();
    } catch (e) {
      setError("Error al crear la empresa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-fadeIn" />
        <Dialog.Content
          className="
            fixed left-[50%] top-[50%]
            max-h-[90vh] w-[90%] max-w-[60%]
            -translate-x-1/2 -translate-y-1/2
            rounded-md bg-white p-4
            focus:outline-none
            data-[state=open]:animate-slideIn
          "
        >
          {/* Encabezado con botón de cerrar */}
          <div className="mb-2 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold">
              Crear Empresa Logística
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Grid de inputs */}
            <div className="grid grid-cols-12 gap-4">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={`col-span-12 md:col-span-${field.md}`}
                >
                  <label className="mb-1 block text-sm font-semibold">
                    {field.label}
                  </label>

                  {field.type === "select" && (
                    <Select
                      {...register(field.name as keyof CreateUserFormData)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="MANAGER">MANAGER</SelectItem>
                        <SelectItem value="USER">USER</SelectItem>
                      </SelectContent>
                    </Select>
                  )}

                  {field.type === "textarea" && (
                    <textarea
                      placeholder={field.label}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      {...register(field.name as keyof CreateUserFormData)}
                    />
                  )}

                  {field.type !== "textarea" && field.type !== "select" && (
                    <input
                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      type={field.type || "text"}
                      placeholder={field.label}
                      {...register(field.name as keyof CreateUserFormData)}
                    />
                  )}

                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[field.name]?.message as string}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Botón de submit */}
            <div className="relative">
              <Button
                type="submit"
                className="flex w-full items-center justify-center rounded  px-4 py-2 font-medium text-white disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin text-white" />
                ) : (
                  "Crear"
                )}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
