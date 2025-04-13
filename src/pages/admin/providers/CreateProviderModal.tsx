import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateProviderFormData, createProviderSchema } from "./validations";

import { useNotifications } from "@toolpad/core";
import { createProvider } from "../../../services/providerService";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, X } from "lucide-react";
import { Button } from "../../../common/components/ui/button";

interface CreateProviderModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateProviderModal: React.FC<CreateProviderModalProps> = ({
  open,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProviderFormData>({
    resolver: zodResolver(createProviderSchema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const notifications = useNotifications();

  const onSubmit = async (data: CreateProviderFormData) => {
    setLoading(true);
    try {
      const newProvider = await createProvider(data, data.companyId);
      notifications.show("Proveedor creado con éxito", {
        severity: "success",
        autoHideDuration: 3000,
      });
      onClose();
      setLoading(false);
    } catch (error) {
      notifications.show("Error al crear proveedor", {
        severity: "error",
        autoHideDuration: 3000,
      });
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
              Crear Proveedor
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
                  className={`col-span-4 md:col-span-${field.md}`}
                >
                  <label className="mb-1 block text-sm font-semibold">
                    {field.label}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      {...register(field.name as keyof CreateProviderFormData)}
                    />
                  ) : (
                    <input
                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      type={field.type || "text"}
                      {...register(field.name as keyof CreateProviderFormData)}
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
};

export default CreateProviderModal;

const fields = [
  { name: "name", label: "Nombre de la empresa", md: 6 },
  { name: "socialReason", label: "Razón Social", md: 6 },
  { name: "cif", label: "CIF", md: 6 },
  { name: "webSite", label: "Sitio web", type: "url", md: 6 },
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
    md: 6,
  },
  { name: "phone", label: "Teléfono", type: "tel", md: 6 },
  { name: "contactPerson", label: "Persona de contacto", md: 6 },
  { name: "companyId", label: "Id Empresa", md: 6, type: "number" },
  {
    name: "contactPhone",
    label: "Teléfono de contacto",
    type: "tel",
    md: 6,
  },
  { name: "contactEmail", label: "Email de contacto", type: "email", md: 6 },
  { name: "logo", label: "Logo", md: 6 },
  { name: "address", label: "Dirección", md: 12 },
  { name: "postalCode", label: "Código Postal", md: 4 },
  { name: "city", label: "Ciudad", md: 4 },
  { name: "province", label: "Provincia", md: 4 },
  { name: "country", label: "País", md: 6 },
  { name: "description", label: "Descripción", md: 6, type: "textarea" },
];
