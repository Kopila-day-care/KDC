import { z } from "zod";

export const bookTourSchema = z.object({
  parent_name:  z.string().min(1, "Name is required").max(100, "Name too long"),
  email:        z.string().email("Invalid email address").max(254, "Email too long"),
  phone:        z.string().min(7, "Phone number is required").max(20, "Phone number too long"),
  booking_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  booking_time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  notes:        z.string().max(1000, "Notes too long (max 1000 characters)").optional(),
});

export const contactSchema = z.object({
  name:    z.string().min(1, "Name is required").max(100, "Name too long"),
  email:   z.string().email("Invalid email address").max(254, "Email too long"),
  phone:   z.string().max(20, "Phone number too long").optional(),
  address: z.string().max(200, "Address too long").optional(),
  subject: z.string().max(100, "Subject too long").optional(),
  message: z.string().min(1, "Message is required").max(5000, "Message too long (max 5000 characters)"),
});

export type BookTourInput = z.infer<typeof bookTourSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
