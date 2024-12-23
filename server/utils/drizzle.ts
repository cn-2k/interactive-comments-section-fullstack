import { drizzle } from "drizzle-orm/d1"
import * as schema from "../database/schema"

export { sql, eq, and, or, asc, desc, sum } from "drizzle-orm"

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

// export type CommentPropsDB = typeof schema.comments.$inferSelect
