export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const deletedComment = await useDrizzle().delete(tables.comments).where(and(
    eq(tables.comments.id, Number(id)),
  )).returning().get()

  if (!deletedComment) {
    throw createError({
      statusCode: 404,
      message: "Comment not found",
    })
  }
  return deletedComment
})
