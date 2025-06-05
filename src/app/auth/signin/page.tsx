'use client'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'

import { googleSignIn } from '@/lib/google-signin'

// export const metadata: Metadata = {
//   title: 'Sign In',
//   description: 'Sign In to your account',
// }

const SignInPage = () => {
  const handleSignIn = async () => {
    await googleSignIn()
  }

  return (
    <div className="flex-center flex-col gap-10">
      <div className="flex-center flex-col gap-2">
        <h1 className="font-bold text-4xl">Welcome</h1>
        <p className="text-lg text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>
      <Button onClick={handleSignIn} className="w-full p-6 text-lg">
        <FcGoogle className="size-6" />
        Sign in with Google
      </Button>
    </div>
  )
}

export default SignInPage
