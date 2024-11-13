import { z } from "zod"

const commentSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  userId: z.number(),
  content: z.string().min(1, { message: "O comentário é obrigatório" }),
  avatar: z.string(),
  isReply: z.boolean().optional(),
  parentId: z.number().optional(),
  createdAt: z.string(),
})

export default eventHandler(async (event) => {
  const result = await readValidatedBody(event, body => commentSchema.parse(body))
  const { name, userId, content, avatar, createdAt, isReply, parentId } = result

  try {
    const comment = await useDrizzle().insert(tables.comments).values({
      name,
      userId,
      content,
      avatar,
      isReply,
      parentId,
      createdAt,
    }).returning().get()

    return comment
  }
  catch (error) {
    console.log("error", error)
  }
})
