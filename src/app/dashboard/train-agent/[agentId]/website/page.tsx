'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  link: z.string().url().min(2).max(200),
})

const WebsitePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-xl">Website</h3>
        <p className="text-zinc-500 font-medium">
          Crawl specific web pages and gain insights from their content to
          enhance your AI Agent's knowledge base.
        </p>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="py-5 flex flex-col gap-2 "
          >
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-zinc-600">
                    Link
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Ex: https://example.com"
                      className="shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="self-end">
              Fetch Link
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default WebsitePage
