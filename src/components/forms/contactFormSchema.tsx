
import * as z from "zod";


export const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "full name must be at least 2 characters.")
    .max(32, "full name must be at most 32 characters."),
  subject: z
    .string()
    .min(10, "subject must be at least 10 characters.")
    .max(100, "subject must be at most 100 characters."),
  email: z.string().email("Please enter a valid email address.").refine((val) => val.includes("@"), {
    message: "Email must contain an '@' symbol.",
  }),
  message: z
    .string()
    .min(15, "message must be at least 15 characters.")
    .max(500, "message must be at most 500 characters."),
});

