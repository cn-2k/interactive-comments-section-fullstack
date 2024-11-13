export interface CommentDBProps {
  id?: number
  userId?: number
  name?: string
  avatar?: string
  content?: string
  likes?: number
  commentLiked?: boolean
  commentDisliked?: boolean
  parentId?: number | null
  isReply?: boolean | null
  isNewComment?: boolean | null
  createdAt?: string
  replies?: CommentDBProps[]
}
