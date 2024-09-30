import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  avatar: text("avatar").notNull(),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  comment_liked: integer("comment_liked").default(0),
  comment_disliked: integer("comment_disliked").default(0),
  parent_id: integer("parent_id"),
  reply: integer("reply").default(0),
  me: integer("me").default(0),
  new_comment: integer("new_comment").default(0),
  created_at: text("created_at").default(sql`(CURRENT_DATE)`),
})
