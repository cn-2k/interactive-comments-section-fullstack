export default eventHandler(async () => {
  const todos = await useDrizzle().select().from(tables.comments).all()

  return todos
})
