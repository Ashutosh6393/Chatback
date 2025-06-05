import { authClient } from '@/lib/auth-client' //import the auth client

export const googleSignIn = async () => {
  await authClient.signIn.social({
    provider: 'google',
    callbackURL: '/dashboard',
    errorCallbackURL: '/error',
    // newUserCallbackURL: "/welcome",
    disableRedirect: false,
  })
}
