import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(1, { message: "El nombre de la empresa es requerido" }),
  socialReason: z.string().min(1, { message: "La razón social es requerida" }),
  cif: z.string().min(1, { message: "El CIF es requerido" }).length(9, { message: "El CIF debe tener 9 caracteres" }),
  webSite: z.string().url({ message: "Debe ser una URL válida" }).optional(),
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
  phone: z.string().min(1, { message: "El teléfono es requerido" }),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email({ message: "Debe ser un correo electrónico válido" }).optional(),
  logo: z.string().optional(),
  address: z.string().min(1, { message: "La dirección es requerida" }),
  postalCode: z.string().min(1, { message: "El código postal es requerido" }),
  city: z.string().min(1, { message: "La ciudad es requerida" }),
  province: z.string().min(1, { message: "La provincia es requerida" }),
  country: z.string().min(1, { message: "El país es requerido" }),
  description: z.string().optional(),
});

export type CreateCompanyFormData = z.infer<typeof createCompanySchema>;
