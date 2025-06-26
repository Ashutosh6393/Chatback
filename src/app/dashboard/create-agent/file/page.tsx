'use client'

import { Dropzone } from '@/components/upload/dropzone'
import {
  UploaderProvider,
  type UploadFn,
} from '@/components/upload/uploader-provider'
import { useEdgeStore } from '@/lib/edgestore'
import * as React from 'react'

const FilePage = () => {
  const { edgestore } = useEdgeStore()

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      })
      // you can run some server action or api here
      // to add the necessary data to your database
      console.log(res)
      return res
    },
    [edgestore],
  )

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-xl">File</h3>
        <p className="text-zinc-500 font-medium">
          The Files tab allows you to upload and manage various document types
          to train your AI agent.
        </p>
      </div>
      <div className="mt-4">
        <UploaderProvider uploadFn={uploadFn} autoUpload>
          <Dropzone
            className="border-[1px] border-zinc-400"
            dropzoneOptions={{
              maxFiles: 5,
              maxSize: 1024 * 1024 * 2, // 2MB
              accept: {
                'docs/*': ['.pdf', '.docx', '.txt'],
              },
            }}
          />
          {/* You can create a component that uses the provider context */}
          {/* (from the `useUploader` hook) to show a custom file list here */}
        </UploaderProvider>
        <p className="text-sm text-zinc-500 text-center mt-2">
          Only .pdf, .docx, .txt files allowed
        </p>
      </div>
    </div>
  )
}

export default FilePage
