import { cn } from "@/app/lib/utils"
import { ExtendedMessages } from "@/types/message"

interface MessageProps {
  message: ExtendedMessages
  isNextMessageSamePerson: boolean
}

const Message = ({ message, isNextMessageSamePerson }: MessageProps) => {
  return (
    <div
      className={cn("flex items-end", { "justify-end": message.isUserMessage })}
    >
      <div
        className={cn(
          "relative flex h-6 w-6 aspect-square items-center justify-center",
          {
            "order-2 bg-blue-600 rounded-sm": message.isUserMessage,
            "order-1 bg-zinc-800 rounded-sm": !message.isUserMessage,
            invisible: isNextMessageSamePerson,
          }
        )}
      ></div>
    </div>
  )
}

export default Message
