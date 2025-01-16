import { useState } from "react"
import { Dialog } from "./ui/dialog"

const UploadButton = () => {
  const [open, setIsOpen] = useState<boolean>(false)
  return (
    <Dialog
      open={open}
      onOpenChange={(visible) => {
        if (!visible) setIsOpen(visible)
      }}
    ></Dialog>
  )
}

export default UploadButton
