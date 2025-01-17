"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
const UploadButton = () => {
  const [open, setIsOpen] = useState<boolean>(false)
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
      <DialogContent>Test Content</DialogContent>¨
      <VisuallyHidden asChild>
        <DialogTitle>Upload PDF</DialogTitle>
      </VisuallyHidden>
    </Dialog>
  )
}

export default UploadButton
