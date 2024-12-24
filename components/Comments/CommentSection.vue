<template>
  <div
    v-if="comments"
    v-auto-animate
    class="w-full px-5 lg:w-[800px] space-y-4"
  >
    <template v-if="comments.length">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="relative flex flex-col"
      >
        <!-- Individual Comment -->
        <CommentItem
          v-bind="comment"
          @update="(content) => handleUpdateComment({ updatedComment: { content }, commentId: comment.id! })"
          @delete="commentToDeleteId = comment.id, deleteDialog = true"
        />

        <!-- Replies and Reply area for new replies -->
        <div
          v-auto-animate
          class="pl-8 lg:pl-20 space-y-4 relative"
        >
          <div class="absolute left-2 lg:left-10 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 mt-4" />

          <CommentItem
            v-for="reply in comment.replies"
            :key="reply.id"
            v-bind="reply"
            is-reply
            @delete="commentToDeleteId = reply.id, deleteDialog = true"
          />

          <CommentItem
            v-if="replyingToId === comment.id || comment.replies?.some(reply => reply.id === replyingToId)"
            :replying-to="replyingName"
            avatar="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            is-new-comment
            is-replying
            is-me
            is-reply
            @send="(content: string) => handleSendComment({ content, isReply: true })"
          />
        </div>
      </div>
    </template>

    <!-- No comments message -->
    <div
      v-if="!comments.length"
      class="text-gray-400"
    >
      There's no comments yet, be the <strong>first one!</strong> 😆
    </div>

    <!-- New comment -->
    <CommentItem
      :avatar="user.avatar_url"
      is-new-comment
      @send="(content: string) => handleSendComment({ content })"
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
          @click="handleDeleteComment(commentToDeleteId), deleteDialog = false"
        />
      </div>
    </div>
  </UModal>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import CommentItem from "./CommentItem.vue"
import { useCommentsQuery } from "@/api/queries/comments"
import { useAddNewComment, useUpdateComment, useDeleteComment } from "@/api/mutations/comments"
import type { GitHubUser } from "~/types/user"

const commentToDeleteId = ref<number | null>(null)

const deleteDialog = ref<boolean>(false)

const {
  replyingToId,
  replyingName,
} = useComments()

const { data: comments } = useCommentsQuery()
const { handleSendComment } = useAddNewComment()
const { handleUpdateComment } = useUpdateComment()
const { handleDeleteComment } = useDeleteComment()

const user: GitHubUser = await fetchGithubUser()
</script>
