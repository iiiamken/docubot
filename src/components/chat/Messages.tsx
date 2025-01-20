import { trpc } from "@/app/_trpc/client"
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query"

interface MessagesProps {
  fileId: string
}

const Messages = ({ fileId }: MessagesProps) => {
  trpc.getFileMessages.useInfiniteQuery(
    {
      fileId,
      limit: INFINITE_QUERY_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    }
  )
  return <div></div>
}

export default Messages
