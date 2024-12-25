
// Validation schemas
export const emailFormSchema = z.object({
    email: z.string().email("Invalid email address"),
  });
  
  export const otpCodeSchema = z.object({
    OTPCode: z.string().length(6, "The one-time password must be 6 digits long"),
  });