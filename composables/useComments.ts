import type { Comment } from "~/types/Comment"

// refer to: https://nuxt.com/docs/getting-started/state-management
const replyingName = useState<string | undefined>("replyingName")
const replyingToId = useState<string>("replyingToId")

export function useComments() {
  function handleReply(comment: Comment) {
    replyingToId.value = comment.id
    replyingName.value = comment.name
  }

  function handleCancelReply() {
    replyingToId.value = ""
  }

  return {
    replyingToId,
    replyingName,
    handleReply,
    handleCancelReply,
  }
}
