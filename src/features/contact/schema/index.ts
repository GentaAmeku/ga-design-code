import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string({ required_error: "Full Name is required" }),
  email: z
    .string({ required_error: "Email Address is required" })
    .email({ message: "Invalid email address." }),
  message: z.string({ required_error: "Message is required" }),
});

export type ContactFormFieldSchema = z.infer<typeof contactSchema>;
