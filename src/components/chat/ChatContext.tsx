import { trpc } from "@/app/_trpc/client"
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query"
import { useMutation } from "@tanstack/react-query"
import { ReactNode, createContext, useRef, useState } from "react"

type StreamResponse = {
  addMessage: () => void
  message: string
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
}

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
})

interface Props {
  fileId: string
  children: ReactNode
}

export const ChatContextProvider = ({ fileId, children }: Props) => {
  const [message, setMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const utils = trpc.useContext()

  const backupMessage = useRef("")

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      return response.body
    },
    onMutate: async () => {
      backupMessage.current = message
      setMessage("")

      //1. cancel outgoing fetches
      await utils.getFileMessages.cancel()

      //2. get data in case we need to revert
      const previousMessages = utils.getFileMessages.getInfiniteData()
      //3. optimistically input data
      utils.getFileMessages.setInfiniteData(
        { fileId, INFINITE_QUERY_LIMIT },
        (old) => {
          //handling edge case of no old data exist
          if (!old) {
            return { pages: [], pageParams: [] }
          }
          //3.1 cloning old page
          let newPages = [...old.pages]
          let latestPage = newPages[0]!
          //3.2 mutate pages messages
          latestPage.messages = [
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              text: message,
              isUserMessage: true,
            },
            ...latestPage.messages,
          ]
          //updating the last page to our new page with injected message
          newPages[0] = latestPage

          //overwrite the data in our api
          return { ...old, pages: newPages }
        }
      )
    },
  })

  const addMessage = () => sendMessage({ message })

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
