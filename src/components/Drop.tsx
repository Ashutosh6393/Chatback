'use client'
import {
  AlertCircleIcon,
  Eye,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileUpIcon,
  XIcon,
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  type FileState,
  useUploader,
} from '@/components/upload/uploader-provider'
import { formatBytes, useFileUpload } from '@/hooks/use-file-upload'

// Create some dummy initial files
const _initialFiles = [
  {
    name: 'document.pdf',
    size: 528737,
    type: 'application/pdf',
    url: 'https://example.com/document.pdf',
    id: 'document.pdf-1744638436563-8u5xuls',
  },
  {
    name: 'intro.zip',
    size: 252873,
    type: 'application/zip',
    url: 'https://example.com/intro.zip',
    id: 'intro.zip-1744638436563-8u5xuls',
  },
  {
    name: 'conclusion.xlsx',
    size: 352873,
    type: 'application/xlsx',
    url: 'https://example.com/conclusion.xlsx',
    id: 'conclusion.xlsx-1744638436563-8u5xuls',
  },
]

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type
  const fileName = file.file instanceof File ? file.file.name : file.file.name

  if (
    fileType.includes('pdf') ||
    fileName.endsWith('.pdf') ||
    fileType.includes('word') ||
    fileName.endsWith('.doc') ||
    fileName.endsWith('.docx')
  ) {
    return <FileTextIcon className="size-4 opacity-60" />
  }
  if (
    fileType.includes('zip') ||
    fileType.includes('archive') ||
    fileName.endsWith('.zip') ||
    fileName.endsWith('.rar')
  ) {
    return <FileArchiveIcon className="size-4 opacity-60" />
  }
  if (
    fileType.includes('excel') ||
    fileName.endsWith('.xls') ||
    fileName.endsWith('.xlsx')
  ) {
    return <FileSpreadsheetIcon className="size-4 opacity-60" />
  }
  return <FileIcon className="size-4 opacity-60" />
}

export default function Component() {
  const params = useParams()
  const agentId = params.agentId as string
  const {
    fileStates, // Array of current file states
    addFiles, // Function to add files
    removeFile, // Function to remove a file by key
    cancelUpload, // Function to cancel an upload by key
    uploadFiles, // Function to trigger uploads (all pending or specific keys)
  } = useUploader()

  async function _getFiles() {
    try {
      const data = await fetch(`/api/agents/files?agentId=${agentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!data.ok) {
        throw new Error('Failed to fetch files')
      }
      const files = await data.json()
      return files
    } catch (error) {
      console.error('Error fetching files:', error)
      toast.error('Failed to fetch files')
      return []
    }
  }

  function handleAddFiles(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (!e.target.files) return
    addFiles(Array.from(e.target.files))
    e.target.value = ''
  }

  function handleRemoveFile(fileState: FileState) {
    if (fileState.status === 'UPLOADING') {
      cancelUpload(fileState.key)
    } else if (fileState.status === 'COMPLETE') {
      // delete file from db and server
    }
    removeFile(fileState.key)
  }

  async function handleUploadFiles() {
    // Upload files marked as PENDING
    // const uploadPromise = Promise.all(
    //   fileStates
    //     .filter((fileState) => fileState.status === 'PENDING')
    //     .map((fileState) => {
    //       uploadFiles([fileState.key])
    //       fileState.status = 'COMPLETE'
    //     }), // remove array bracket
    // )

    toast.promise(
      (async () => {
        const pendingFiles = fileStates.filter(
          (file) => file.status === 'PENDING',
        )

        for (const fileState of pendingFiles) {
          await uploadFiles([fileState.key])
        }
      })(),

      {
        loading: 'Uploading files...',
        success: 'Files uploaded and saved successfully!',
        error: 'Failed to upload or save files',
      },
    )
  }

  const maxSize = 2 * 1024 * 1024 // 10MB default
  const maxFiles = 1

  const [
    { isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    accept:
      'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    multiple: true,
    maxFiles,
    maxSize,
  })

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <button
        type="button"
        tabIndex={0}
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-input border-dashed p-4 transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-[input:focus]:border-ring has-disabled:opacity-50 has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload files"
          onChange={handleAddFiles}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
            aria-hidden="true"
          >
            <FileUpIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 font-medium text-sm">Upload files</p>
          <p className="mb-2 text-muted-foreground text-xs">
            Drag & drop or click to browse
          </p>
          <div className="flex flex-wrap justify-center gap-1 text-muted-foreground/70 text-xs">
            <span>Pdf, Word, Text files only.</span>
            <span>∙</span>
            <span>Max {maxFiles} files</span>
            <span>∙</span>
            <span>Up to {formatBytes(maxSize)}</span>
          </div>
        </div>
      </button>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-destructive text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />

          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}

      {fileStates.length > 0 && (
        <div className="space-y-2">
          {fileStates.map((fileState) => (
            <div
              key={fileState.key}
              className="flex items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                  {getFileIcon({ file: fileState.file })}
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate font-medium text-[13px]">
                    {fileState.file.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatBytes(fileState.file.size)}
                  </p>
                  {fileState.status === 'ERROR' && (
                    <div
                      className="flex items-center gap-1 text-destructive text-xs"
                      role="alert"
                    >
                      <AlertCircleIcon className="size-3 shrink-0" />

                      <span>{fileState.error}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {fileState.status === 'COMPLETE' && fileState.url && (
                  <a
                    href={fileState.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm text-zinc-800 hover:text-foreground"
                  >
                    <Eye className="size-5 text-foreground/80 hover:text-foreground" />
                  </a>
                )}
                {fileState.status === 'UPLOADING' && (
                  <span className="text-sm text-zinc-800 ">
                    {fileState.progress}%
                  </span>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className="-me-2 size-8 cursor-pointer text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                  onClick={() => handleRemoveFile(fileState)}
                  aria-label="Remove file"
                >
                  <XIcon className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))}

          {fileStates.length > 0 && (
            <div className="mt-4">
              <Button size="sm" variant="default" onClick={handleUploadFiles}>
                Upload
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
