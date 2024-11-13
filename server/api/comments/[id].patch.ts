export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)

  if (!id) throw createError({ statusCode: 500, statusMessage: "id is required" })

  const { content, likes, commentLiked, commentDisliked } = await readBody(event)

  // TODO: MAKE ZOD VALIDATION

  const comment = await useDrizzle().update(tables.comments).set({
    content,
    likes,
    commentLiked,
    commentDisliked,
  }).where(eq(tables.comments.id, Number(id))).returning().get()

  return comment
})
