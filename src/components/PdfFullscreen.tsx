import { useState } from "react"
import { Dialog, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Expand, Loader2 } from "lucide-react"
import { DialogContent } from "@radix-ui/react-dialog"
import { useToast } from "@/hooks/use-toast"
import { Document, Page } from "react-pdf"
import { useResizeDetector } from "react-resize-detector"
import SimpleBar from "simplebar-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface PdfFullscreenProps {
  url: string
}

const PdfFullscreen = ({ url }: PdfFullscreenProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [numPages, setNumPages] = useState<number>()

  const { toast } = useToast()
  const { width: resizeWidth, ref: resizeRef } = useResizeDetector()

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setIsOpen(v)
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button variant="ghost" aria-label="fullscreen" className="gap-1.5">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={resizeRef}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: "Error loading PDF",
                  description: "Please try again later",
                  variant: "destructive",
                })
              }}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages)
              }}
              file={url}
              className="max-h-full"
            >
              {new Array(numPages).fill(0).map((_, i) => (
                <Page
                  key={i}
                  pageNumber={i + 1}
                  width={resizeWidth ? resizeWidth : 1}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
      <VisuallyHidden asChild>
        <DialogTitle>Upload PDF</DialogTitle>
      </VisuallyHidden>
    </Dialog>
  )
}

export default PdfFullscreen
