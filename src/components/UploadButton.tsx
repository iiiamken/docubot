"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import Dropzone from "react-dropzone"
import { Cloud, File } from "lucide-react"
import { Progress } from "./ui/progress"
import { useUploadThing } from "@/app/lib/uploadthing"
import { useToast } from "@/hooks/use-toast"
import { trpc } from "@/app/_trpc/client"
import { useRouter } from "next/navigation"
const UploadButton = () => {
  const [open, setIsOpen] = useState<boolean>(false)

  const UploadDropZone = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [uploadProgress, setUploadprogress] = useState<number>(0)
    const { toast } = useToast()

    const { startUpload } = useUploadThing("pdfUploader")

    const router = useRouter()
    const { mutate: startPolling } = trpc.getFile.useMutation({
      onSuccess: (file) => {
        router.push(`/dashboard/${file.id}`)
      },
      retry: true,
      retryDelay: 500,
    })
    const startSimulatedProgress = () => {
      //start by setting progress to 0
      setUploadprogress(0)
      //update progress with interval
      const interval = setInterval(() => {
        setUploadprogress((prevProgress) => {
          if (prevProgress >= 95) {
            clearInterval(interval)
            return prevProgress
          }
          return prevProgress + 5
        })
      }, 500)
      return interval
    }
    return (
      <Dropzone
        multiple={false}
        onDrop={async (acceptedFiles) => {
          setIsUploading(true)
          const progressInterval = startSimulatedProgress()

          //handle file uploading
          const res = await startUpload(acceptedFiles)

          if (!res) {
            toast({
              title: "Something went wrong",
              description: "Please try again",
              variant: "destructive",
            })
          }

          const [fileResponse] = res

          const key = fileResponse?.key

          if (!key) {
            toast({
              title: "Something went wrong",
              description: "Please try again",
              variant: "destructive",
            })
          }
          clearInterval(progressInterval)
          setUploadprogress(100)

          startPolling(key)
        }}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <div
            {...getRootProps()}
            className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
          >
            <div className="flex items-center justify-center h-full w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                  <p className="mb-2 text-sm text-zinc-700">
                    <span className="font-semibold">Click to upload</span>
                    or drag and drop
                  </p>
                  <p className="text-sm text-zinc-500">PDF (up to 4MB)</p>
                </div>
                {acceptedFiles && acceptedFiles[0] && (
                  <div className="max-w-xs bg-white items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                    <div className="px-3 py-2 h-full grid place-items-center">
                      <File className="h-4 w-4 text-blue-500" />

                      <div className="px-3 py-2 h-full text-sm truncate">
                        {acceptedFiles[0].name}
                      </div>
                    </div>
                  </div>
                )}
                {isUploading && (
                  <div className="w-full mt-4 max-w-xs mx-auto">
                    <Progress
                      value={uploadProgress}
                      className="h-1 w-full bg-zinc-200"
                    />
                  </div>
                )}
                <input
                  {...getInputProps}
                  type="file"
                  id="dropzone-file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}
      </Dropzone>
    )
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(visible) => {
        if (!visible) {
          setIsOpen(visible)
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropZone />
      </DialogContent>
      <VisuallyHidden asChild>
        <DialogTitle>Upload PDF</DialogTitle>
      </VisuallyHidden>
    </Dialog>
  )
}

export default UploadButton
