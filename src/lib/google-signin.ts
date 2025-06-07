import { authClient } from "@/lib/auth-client";

export const googleSignIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
    errorCallbackURL: "/error",
    disableRedirect: false,
  });
};
