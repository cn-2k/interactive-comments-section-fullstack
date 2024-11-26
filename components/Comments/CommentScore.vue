<template>
  <div class="flex items-center justify-between w-fit sm:items-start sm:mr-4">
    <div class="inline-flex py-1.5 sm:gap-1 px-2 sm:px-0 justify-center items-center rounded-lg bg-base-light-grayish-blue/15 sm:flex-col">
      <UButton
        variant="link"
        color="blue"
        :disabled="hasUserLiked || isAuthor"
        class="flex justify-center"
        title="Upvote"
        icon="i-material-symbols-add-rounded"
        @click="handleVoteAction('upvote')"
      />
      <span class="w-9 sm:w-10 text-center text-base-moderate-blue font-medium">{{ currentLikes }}</span>
      <UButton
        variant="link"
        color="blue"
        :disabled="hasUserDisliked || isAuthor"
        class="flex justify-center"
        title="Downvote"
        icon="i-ic-round-minus"
        @click="handleVoteAction('downvote')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const props = defineProps<{
  commentDisliked: boolean
  commentLiked: boolean
  commentId: number
  likes: number
  isAuthor: boolean
}>()

const currentLikes = ref(props.likes)
const hasUserLiked = ref(props.commentLiked)
const hasUserDisliked = ref(props.commentDisliked)

const handleVoteAction = async (voteType: "upvote" | "downvote") => {
  if ((voteType === "upvote" && hasUserLiked.value) || (voteType === "downvote" && hasUserDisliked.value)) return

  const updatedLikes = voteType === "upvote" ? currentLikes.value + 1 : currentLikes.value - 1
  hasUserLiked.value = voteType === "upvote"
  hasUserDisliked.value = voteType === "downvote"
  currentLikes.value = updatedLikes

  try {
    await $fetch(`/api/comments/${props.commentId}`, {
      method: "PATCH",
      body: {
        likes: updatedLikes,
        commentLiked: hasUserLiked.value,
        commentDisliked: hasUserDisliked.value,
      },
    })
  }
  catch (error) {
    currentLikes.value = voteType === "upvote" ? updatedLikes - 1 : updatedLikes + 1
    hasUserLiked.value = voteType === "upvote" ? false : hasUserLiked.value
    hasUserDisliked.value = voteType === "downvote" ? false : hasUserDisliked.value
    console.error("Error updating like/dislike:", error)
  }
}
</script>
