'use client'

import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import Drop from '@/components/Drop'
import {
  UploaderProvider,
  type UploadFn,
} from '@/components/upload/uploader-provider'
import { useEdgeStore } from '@/lib/edgestore'

const FilePage = () => {
  const { edgestore } = useEdgeStore()
  const [_uploading, setUploading] = useState(false)

  const uploadFn: UploadFn = useCallback(
    async ({ file, onProgressChange, signal }) => {
      setUploading(true)

      const res = await edgestore.publicFiles
        .upload({
          file,
          signal,
          onProgressChange,
        })
        .finally(() => setUploading(false))
      // toast.success(`File ${file.name} uploaded successfully!`)
      console.log(res)
      return res
    },
    [edgestore],
  )

  return (
    <UploaderProvider uploadFn={uploadFn} autoUpload={false}>
      <div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-xl">File</h3>
          <p className="font-medium text-zinc-500">
            The Files tab allows you to upload and manage various document types
            to train your AI agent.
          </p>
        </div>
        <div className="mt-4">
          <Drop />
        </div>
      </div>
    </UploaderProvider>
  )
}

export default FilePage
