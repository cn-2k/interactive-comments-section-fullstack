import type { GitHubUser } from "~/types/user"

const user: GitHubUser = await fetchGithubUser()
const {
  replyingToId,
} = useComments()

// TODO: zod type
export const useAddNewComment = defineMutation(() => {
  const queryCache = useQueryCache()

  const { mutateAsync: handleSendComment, ...mutation } = useMutation({
    mutation: async ({ content, isReply }: { content: string, isReply?: boolean }) => {
      try {
        const newComment = {
          name: user.name,
          userId: user.id,
          content: content,
          avatar: user.avatar_url,
          createdAt: new Date().toISOString(),
        }

        if (isReply) {
          Object.assign(newComment, {
            parentId: replyingToId,
            isReply: true,
          })
        }

        await $fetch("/api/comments", {
          method: "POST",
          body: newComment,
        })
      }
      catch (error) {
        console.log(error)
      }
    },

    onSettled: () => {
      queryCache.invalidateQueries({ key: ["comments-list"] })
    },
  })

  return {
    ...mutation,
    handleSendComment,
  }
})

export const useUpdateComment = defineMutation(() => {
  const queryCache = useQueryCache()

  const { mutateAsync: handleUpdateComment, ...mutation } = useMutation({
    mutation: async ({ updatedComment, commentId }: { updatedComment: any, commentId: number }) => {
      try {
        await $fetch(`/api/comments/${commentId}`, {
          method: "PATCH",
          body: updatedComment,
        })
      }
      catch (error) {
        console.log(error)
      }
    },

    onSettled: () => {
      queryCache.invalidateQueries({ key: ["comments-list"] })
    },
  })

  return {
    ...mutation,
    handleUpdateComment,
  }
})

export const useDeleteComment = defineMutation(() => {
  const queryCache = useQueryCache()

  const { mutateAsync: handleDeleteComment, ...mutation } = useMutation({
    mutation: async (commentId: number | null) => {
      try {
        await $fetch(`/api/comments/${commentId}`, {
          method: "DELETE",
        })
      }
      catch (error) {
        console.log(error)
      }
    },

    onSettled: () => {
      queryCache.invalidateQueries({ key: ["comments-list"] })
    },
  })

  return {
    ...mutation,
    handleDeleteComment,
  }
})
