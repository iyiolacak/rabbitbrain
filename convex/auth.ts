import { convexAuth } from "@convex-dev/auth/server";
import Github from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import { ResendOTP } from "./ResendOTP";
 
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [ResendOTP, Google, Github],
});