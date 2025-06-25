'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  title: z.string().min(2).max(50),
  text: z.string().min(2).max(20000),
})

const FilePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      text: '',
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
        <h3 className="font-semibold text-xl">File</h3>
        <p className="text-zinc-500 font-medium">
          The Files tab allows you to upload and manage various document types
          to train your AI agent.
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      className="shadow-none "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-zinc-500 font-normal text-sm text-center px-5">
              If you are uploading a PDF, make sure you can select/highlight the
              text. <br /> Allowed file types: .pdf, .doc, .docx, .txt
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default FilePage
