// import { createContext } from "vm"

// type StreamResponse = {
//   addMessage: () => void
//   message: string
//   handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
//   isLoading: boolean
// }

// export const ChatContext = createContext<StreamResponse>({
//   addMessage: () => {},
//   message: "",
//   handleInputChange: () => {},
//   isLoading: false,
// })

import { ReactNode, createContext, useState } from "react"

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
