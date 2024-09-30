import type { InferSelectModel } from "drizzle-orm"
import type { Comment } from "./Comment"
import type { comments } from "@/server/database/schema"

export type CommentProps = InferSelectModel<typeof comments>

export function getCommentsAdapter(data: CommentProps[] | undefined): Comment[] {
  if (!data) {
    return []
  }

  return data.map(comment => ({
    id: comment.id,
    name: comment.name,
    avatar: comment.avatar,
    content: comment.content,
    isReply: Boolean(comment.reply),
    likes: comment.likes ?? 0,
    commentLiked: Boolean(comment.comment_liked),
    commentDisliked: Boolean(comment.comment_disliked),
    isMe: Boolean(comment.me),
    isNewComment: Boolean(comment.new_comment),
    createdAt: comment.created_at ? new Date(comment.created_at) : new Date(),
  }))
}
