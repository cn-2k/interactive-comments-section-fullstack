export interface CommentDBProps {
  id: number
  name: string
  avatar: string
  content: string
  likes: number | null
  commentLiked: boolean | null
  commentDisliked: boolean | null
  parentId: number | null
  isReply: boolean | null
  isMe: boolean
  isNewComment: boolean | null
  createdAt: string
  replies?: CommentDBProps[]
}
