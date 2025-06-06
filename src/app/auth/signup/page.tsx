'use client'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { googleSignIn } from '@/lib/google-signin'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  firstName: z
    .string()
    .min(1, {
      message: 'First name is required',
    })
    .max(25, {
      message: 'First name must be less than 25 characters',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Last name is required',
    })
    .max(25, {
      message: 'Last name must be less than 25 characters',
    }),
})

type FormValues = z.infer<typeof formSchema>

const SignUpPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  })

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <div className="flex-center flex-col gap-10 lg:w-1/4">
      <div className="flex-center flex-col gap-2">
        <h1 className="font-bold text-4xl text-zinc-900">Welcome</h1>
        <p className="text-center text-lg text-muted-foreground">
          Sign up to continue
        </p>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      {...field}
                      className="bg-zinc-100 p-6 lg:text-lg"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last name"
                      {...field}
                      className="bg-zinc-100 p-6 lg:text-lg"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your email"
                      {...field}
                      className="bg-zinc-100 p-6 lg:text-lg"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full p-6 text-base ">
              Sign up
            </Button>
          </form>
        </Form>
        <p className="text-center text-zinc-500">OR</p>
        <Button
          onClick={async () => await googleSignIn()}
          className="p-6 text-base"
        >
          <FcGoogle className="size-6" />
          Continue with Google
        </Button>
      </div>
    </div>
  )
}

export default SignUpPage
