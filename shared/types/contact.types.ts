import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(20, "Please enter at least 20 characters.")
    .max(1200, "Please keep your message under 1200 characters."),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please keep your name under 80 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ContactFieldName = keyof ContactFormValues;
export type ContactFieldErrors = Partial<Record<ContactFieldName, string[] | undefined>>;

export type ContactSuccessResponse = {
  deliveryId?: string;
  message: string;
  success: true;
};

export type ContactErrorResponse = {
  fieldErrors?: ContactFieldErrors;
  message: string;
  success: false;
};

export type ContactApiResponse = ContactErrorResponse | ContactSuccessResponse;
