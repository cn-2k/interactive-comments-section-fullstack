export default eventHandler(async (event) => {
  const { name, content, avatar, isMe, createdAt } = await readBody(event)

  const todo = await useDrizzle().insert(tables.comments).values({
    name,
    content,
    avatar,
    isMe,
    createdAt,
  }).returning().get()

  return todo
})
