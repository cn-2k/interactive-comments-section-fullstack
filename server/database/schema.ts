import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  name: text("name").notNull(),
  avatar: text("avatar").notNull(),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  commentLiked: integer("comment_liked", { mode: "boolean" }).default(false),
  commentDisliked: integer("comment_disliked", { mode: "boolean" }).default(false),
  parentId: integer("parent_id").references((): any => comments.id, { onDelete: "cascade" }),
  isReply: integer("reply", { mode: "boolean" }).default(false),
  isMe: integer("me", { mode: "boolean" }).default(false).notNull(),
  isNewComment: integer("new_comment", { mode: "boolean" }).default(false),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()).notNull(),
})
