"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import Dropzone from "react-dropzone"
const UploadButton = () => {
  const [open, setIsOpen] = useState<boolean>(false)

  const UploadDropZone = () => {
    return (
      <Dropzone multiple={false}>
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
                  example
                </div>
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
