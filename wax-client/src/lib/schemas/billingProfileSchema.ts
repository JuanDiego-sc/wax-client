import { z } from 'zod';

const requiredText = (label: string, maxLength?: number) => {
  let schema = z.string().trim().min(1, `${label} es obligatorio.`);

  if (maxLength) {
    schema = schema.max(maxLength, `${label} no puede superar ${maxLength} caracteres.`);
  }

  return schema;
};

// El consentimiento solo es exigible al completar el registro (requiresConsent),
// no al editar un perfil ya verificado, cuyo consentimiento ya quedó registrado.
const consentMessages = {
  acceptsTerms: 'Debes aceptar los Términos y Condiciones para completar tu registro.',
  acceptsDataProcessing: 'Debes autorizar el tratamiento de tus datos personales (LOPDP).',
  acceptsAiUse: 'Debes aceptar el aviso de uso de inteligencia artificial.',
} as const;

export const billingProfileSchema = z.object({
  firstName: requiredText('El nombre', 50),
  lastName: requiredText('El apellido', 50),
  identificationType: requiredText('El tipo de identificación', 20),
  identificationNumber: requiredText('El número de identificación', 20),
  phone: requiredText('El teléfono', 20),
  name: requiredText('El nombre completo para facturación', 100),
  line1: requiredText('La dirección principal', 200),
  line2: z.string().trim().max(120, 'La dirección complementaria no puede superar 120 caracteres.').optional().or(z.literal('')),
  city: requiredText('La ciudad', 100),
  state: requiredText('La provincia o estado', 100),
  postalCode: requiredText('El código postal', 20),
  country: requiredText('El país', 100),
  requiresConsent: z.boolean(),
  acceptsTerms: z.boolean(),
  acceptsDataProcessing: z.boolean(),
  acceptsAiUse: z.boolean(),
}).superRefine((values, ctx) => {
  if (!values.requiresConsent) return;

  for (const field of ['acceptsTerms', 'acceptsDataProcessing', 'acceptsAiUse'] as const) {
    if (!values[field]) {
      ctx.addIssue({ code: 'custom', path: [field], message: consentMessages[field] });
    }
  }
});

export type BillingProfileSchema = z.infer<typeof billingProfileSchema>;
