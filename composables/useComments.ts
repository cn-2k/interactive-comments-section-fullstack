import type { CommentDBProps } from "~/types/db"

// refer to: https://nuxt.com/docs/getting-started/state-management
const replyingName = useState<string | undefined>("replyingName")
const replyingToId = useState<number | null>()

export function useComments() {
  function handleReply(comment: CommentDBProps) {
    replyingToId.value = comment.id
    replyingName.value = comment.name
  }

  function handleCancelReply() {
    replyingToId.value = null
  }

  return {
    replyingToId,
    replyingName,
    handleReply,
    handleCancelReply,
  }
}
