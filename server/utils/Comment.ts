export interface Comment {
  id: any
  name?: string
  avatar?: string
  content?: string
  isReply?: boolean
  likes?: number
  commentLiked?: boolean
  commentDisliked?: boolean
  isMe?: boolean
  isNewComment?: boolean
  createdAt: Date
}
