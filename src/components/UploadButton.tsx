"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"

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

      <DialogContent>Test Content</DialogContent>
    </Dialog>
  )
}

export default UploadButton
