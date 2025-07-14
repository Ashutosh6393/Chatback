'use client'

import * as React from 'react'
import { toast } from 'sonner'
import Drop from '@/components/Drop'
import { Dropzone } from '@/components/upload/dropzone'
import {
  UploaderProvider,
  type UploadFn,
} from '@/components/upload/uploader-provider'
import { useEdgeStore } from '@/lib/edgestore'
import FileUploads from './FileUploads'

const FilePage = () => {
  const { edgestore } = useEdgeStore()
  const [uploading, setUploading] = React.useState(false)

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      setUploading(true)

      const res = await edgestore.publicFiles
        .upload({
          file,
          signal,
          onProgressChange,
        })
        .finally(() => setUploading(false))
      toast.success(`File ${file.name} uploaded successfully!`)
      console.log(res)
      return res
    },
    [edgestore],
  )

  return (
    <div>
      <UploaderProvider uploadFn={uploadFn}>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-xl">File</h3>
          <p className="text-zinc-500 font-medium">
            The Files tab allows you to upload and manage various document types
            to train your AI agent.
          </p>
        </div>
        <div className="mt-4">
          <Drop />
        </div>

        {/* <div className="mt-4">
          <Dropzone
            disabled={uploading}
            className="border-[1px] border-zinc-400 h-50"
            dropzoneOptions={{
              // maxFiles: 1,
              maxSize: 1024 * 1024 * 2, // 2MB
              accept: {
                "docs/*": [".pdf", ".docx", ".txt"],
              },
              multiple: false,
            }}
          />
          <p className="text-sm text-zinc-500 text-center mt-2">
            Only .pdf, .docx, .txt files allowed <br />
            If you are uploading a PDF, make sure you can select/highlight the
            text.
          </p>
        </div>
        <FileUploads /> */}
      </UploaderProvider>
    </div>
  )
}

export default FilePage
