export default eventHandler(async () => {
  // Obter todos os comentários
  const allComments = await useDrizzle().select().from(tables.comments).all()

  // Criar um mapa para armazenar comentários pai com suas replies
  const commentsMap = new Map<number, any>()

  // Iterar sobre os comentários e organizar replies
  allComments.forEach((comment) => {
    const { id, parentId } = comment

    if (parentId === null) {
      // Comentário pai: adicionar ao mapa
      commentsMap.set(id, { ...comment, replies: [] })
    }
    else {
      // Reply: encontrar o comentário pai e adicionar ao array de replies
      const parentComment = commentsMap.get(parentId)

      if (parentComment) {
        parentComment.replies.push(comment)
      }
      else {
        // Se o comentário pai ainda não está no mapa, inicializa com o array de replies
        commentsMap.set(parentId, { id: parentId, replies: [comment] })
      }
    }
  })

  // Retornar a lista de comentários com suas replies aninhadas
  return Array.from(commentsMap.values())
})
