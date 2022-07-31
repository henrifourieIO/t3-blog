import z from "zod";


// # Create User Schema
export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
export type CreateUserSchema = 
z.TypeOf<typeof createUserSchema>;


// # Request OTP Schema
export const requestOTPSchema = z.object({
  email: z.string().email(),
  redirect: z.string().default('/')
});
export type RequestOTPSchema = 
z.TypeOf<typeof requestOTPSchema>;

// # Verify OTP Schema
export const verifyOTPSchema = z.object({
  hash: z.string()
})
export type VerifyOTPSchema = 
z.TypeOf<typeof verifyOTPSchema>;
