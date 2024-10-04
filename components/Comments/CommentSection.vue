<template>
  <div
    v-auto-animate
    class="w-full px-5 lg:w-[800px] space-y-4"
  >
    <template v-if="comments?.length">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="relative flex flex-col"
      >
        <!-- Individual Comment -->
        <CommentItem v-bind="comment" />

        <!-- Replies and Reply area for new replies -->
        <!-- <div
          v-auto-animate
          class="pl-8 lg:pl-20 space-y-4 relative"
        >
          <div class="absolute left-2 lg:left-10 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 mt-4" />

          <CommentItem
            v-for="reply in comment.replies"
            :key="reply.id"
            v-bind="reply"
            is-reply
          />

          <CommentItem
            v-if="replyingToId === comment.id || comment.replies?.some(reply => reply.id === replyingToId)"
            :id="replyingToId"
            :replying-to="replyingName"
            avatar="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            is-new-comment
            is-replying
            is-me
            is-reply
          />
        </div> -->
      </div>
    </template>

    <!-- No comments message -->
    <div
      v-if="!comments?.length"
      class="text-gray-400"
    >
      Ainda não há nenhum comentário, seja o primeiro!
    </div>

    <!-- New comment -->
    <CommentItem
      :avatar="user.avatar_url"
      is-new-comment
      is-me
      @send="(content: string) => sendComment(content)"
    />
  </div>

  <!-- Delete comment dialog -->
  <UModal v-model="deleteDialog">
    <div class="p-7 flex flex-col gap-6">
      <h1 class="text-xl font-medium text-neutral-dark-blue dark:text-white">
        Delete comment
      </h1>
      <p class="text-neutral-grayish-blue dark:text-white">
        Are you sure you want to delete this comment? This will remove the comment and can't be undone.
      </p>
      <div class="flex gap-3 justify-center">
        <UButton
          label="NO, CANCEL"
          color="base"
          class="bg-neutral-grayish-blue dark:text-white hover:bg-neutral-grayish-blue/50 px-6 py-2.5 transition-colors"
          @click="deleteDialog = false"
        />
        <UButton
          label="YES, DELETE"
          color="base"
          class="bg-base-soft-red dark:text-white hover:bg-base-soft-red/50 px-6 py-2.5 transition-colors"
          @click="confirmDelete"
        />
      </div>
    </div>
  </UModal>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import CommentItem from "./CommentItem.vue"
import type { CommentDBProps } from "~/types/db"
import type { GitHubUser } from "~/types/user"

// Carregar os comentários com um valor padrão de array vazio e armazenar em um ref
const { data: initialComments } = await useFetch<CommentDBProps[]>("/api/comments", {
  default: () => [],
})

// Transformamos a lista de comentários em um ref para ser reativo e manipulável localmente
const comments = ref<CommentDBProps[]>(initialComments.value || [])

// Carregar o usuário
const user: GitHubUser = await fetchGithubUser()

const {
  replyingToId,
  replyingName,
} = useComments()

// Função para adicionar o novo comentário à lista localmente
const addNewComment = (newComment: CommentDBProps) => {
  comments.value.push(newComment) // Adiciona o novo comentário no início da lista
}

const sendComment = async (content: string) => {
  try {
    const newComment = {
      name: user.name,
      content: content,
      avatar: user.avatar_url,
      isMe: true,
      createdAt: new Date().toISOString(),
      id: Date.now(),
    }

    // Atualiza localmente antes da resposta
    addNewComment(newComment)

    // Enviar o comentário para a API
    const response = await $fetch("/api/comments", {
      method: "POST",
      body: newComment,
    })

    console.log("Comentário enviado com sucesso:", response)
  }
  catch (error) {
    console.error("Erro ao enviar comentário:", error)
  }
}
</script>
