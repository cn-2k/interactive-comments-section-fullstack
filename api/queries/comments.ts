import type { CommentDBProps } from "@/types/db"

export const useCommentsQuery = defineQuery({
  key: ["comments-list"],
  query: async () => await $fetch<CommentDBProps[]>(`/api/comments`),
})
