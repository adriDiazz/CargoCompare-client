import { z } from 'zod';

export const adminVerificationSchema = z.object({
    verificationCode: z.string(),
    // .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    // .regex(/[A-Z]/, { message: "La contraseña debe tener al menos una letra mayúscula" })
    // .regex(/[a-z]/, { message: "La contraseña debe tener al menos una letra minúscula" })
    // .regex(/[0-9]/, { message: "La contraseña debe tener al menos un número" })
    // .regex(/[@$!%*?&#]/, { message: "La contraseña debe tener al menos un carácter especial (@$!%*?&#)" }),
});

export type AdminVerificationFormData = z.infer<typeof adminVerificationSchema>;