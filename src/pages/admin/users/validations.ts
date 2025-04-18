import { z } from 'zod';


export const createUserSchema = z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    lastName: z.string().min(1, { message: "El apellido es requerido" }),
    email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
    role: z.string().min(1, { message: "El rol es requerido" }),
    state: z.string().min(1, { message: "El estado es requerido" }),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
