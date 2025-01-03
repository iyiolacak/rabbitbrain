export const Config = {
    resendApiKey: process.env.AUTH_RESEND_KEY || "",
    senderEmail: "rabbitbrain <onboarding@resend.dev>",
    otpMaxAge: 60 * 15 // 15 minutes
};