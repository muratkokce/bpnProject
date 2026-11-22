import { z } from 'zod';

export const addKliqFamilyMemberSchema = z.object({
  countryCode: z.string().regex(/^\+\d{1,3}$/, 'Geçerli bir ülke kodu seçin.'),
  phone: z
    .string()
    .min(1, 'Telefon numarası zorunludur.')
    .regex(/^\d{10}$/, 'Telefon numarası 10 rakamdan oluşmalıdır.'),
  tckn: z
    .string()
    .min(1, 'T.C. kimlik numarası zorunludur.')
    .regex(/^\d{11}$/, 'T.C. kimlik numarası 11 rakamdan oluşmalıdır.'),
});

export type AddKliqFamilyMemberForm = z.infer<typeof addKliqFamilyMemberSchema>;
