"use client"
import { useState } from "react"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"

const UploadButton = () => {
  const [open, setIsOpen] = useState<boolean>(false)
  return (
    <Dialog
      open={open}
      onOpenChange={(visible) => {
        if (!visible) setIsOpen(visible)
      }}
    >
      <DialogTrigger asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>
    </Dialog>
  )
}

export default UploadButton
