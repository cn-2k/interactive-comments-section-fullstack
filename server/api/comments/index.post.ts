export default eventHandler(async (event) => {
  const { name, content, avatar, me, parent_id, created_at } = await readBody(event)

  const todo = await useDrizzle().insert(tables.comments).values({
    name,
    content,
    avatar,
    me,
    parent_id,
    created_at,
  }).returning().get()

  return todo
})
