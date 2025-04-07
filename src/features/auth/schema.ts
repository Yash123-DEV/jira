import {z} from "zod";

export const loginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(1,"Required"),
});

export const registerSchema = z.object({
   username: z.string().trim().min(8 ,"Minimum 8 characters").max(16 , "Maximum 16 characters"),
   email: z.string().email(),
   password: z.string().min(8, "Minimum 8 characters"),
});