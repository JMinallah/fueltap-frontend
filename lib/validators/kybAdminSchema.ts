import { z } from "zod";

export const corporateIdentitySchema = z.object({
  companyName: z
    .string({ message: "field cannot be empty." })
    .min(2, { message: "Company name must be at least 2 characters." }),
  rcNumber: z
    .string({ message: "field cannot be empty." })
    .min(5, { message: "Please enter a valid RC number." }),
  tin: z
    .string({ message: "field cannot be empty." })
    .min(8, { message: "Please enter a valid TIN." }),
  ctiNumber: z
    .string({ message: "field cannot be empty." })
    .min(5, { message: "Please enter a valid Corporate Tax ID number." }),
  dateOfRegistration: z
    .string({ message: "field cannot be empty." })
    .min(1, { message: "Date of registration is required." }),
});

export type CorporateIdentityInput = z.infer<typeof corporateIdentitySchema>;

export const corporateDocsSchema = z.object({
  companyLogo: z
    .array(z.instanceof(File))
    .min(1, { message: "Company logo is required." }),
  cacCertificate: z
    .array(z.instanceof(File))
    .min(1, { message: "CAC certificate is required." }),
  tinCertificate: z
    .array(z.instanceof(File))
    .min(1, { message: "TIN certificate is required." }),
  tmCertificate: z.array(z.instanceof(File)).optional(),
});

export type CorporateDocsInput = z.infer<typeof corporateDocsSchema>;
