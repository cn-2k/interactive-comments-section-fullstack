<template>
  <div class="relative rounded-lg flex flex-col-reverse sm:flex-row bg-white justify-between w-full items-start gap-6 lg:gap-3 px-5 py-5 pb-8 text-base dark:bg-gray-800 overflow-hidden">
    <template v-if="!props.isNewComment">
      <!-- Comment Score  -->
      <CommentScore
        :comment-disliked="props.commentDisliked"
        :comment-liked="props.commentLiked"
        :comment-id="props.id!"
        :likes="props.likes"
        :is-author="isCommentAuthor"
      />

      <!-- Comment Content -->
      <div
        class="comment-content flex flex-col w-full text-ellipsis overflow-hidden gap-4 p-2"
      >
        <!-- Comment Author  -->
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <p class="inline-flex gap-4 items-center text-neutral-dark-blue dark:text-white font-medium">
              <img
                class="size-7 rounded-full"
                :src="props.avatar"
                :alt="props.name"
              >{{ props.name }}
            </p>
            <span
              v-if="isCommentAuthor"
              class="text-xs font-medium rounded-sm bg-base-moderate-blue text-white px-2 py-0.5"
            >you</span>
            <p class="text-sm text-neutral-grayish-blue ml-2 dark:text-gray-400">
              <time
                pubdate
                :title="props.createdAt"
              >{{ useTimeAgo(props.createdAt!) }}</time>
            </p>
          </div>
        </div>

        <!-- Comment textarea  -->
        <div
          v-auto-animate
          class=""
        >
          <textarea
            v-if="isEditing"
            ref="textAreaRef"
            v-model="input"
            v-auto-animate
            rows="3"
            :spellcheck="isEditing ? true : false"
            class="w-full border text-gray-800 resize-none dark:text-zinc-50 dark:focus:border-gray-600 border-gray-200 dark:border-gray-700 dark:bg-transparent rounded p-3 focus:outline-none focus:border focus:border-base-moderate-blue"
            placeholder="Add a comment..."
            required
          />

          <p
            v-if="!isEditing"
            class="text-gray-500 dark:text-gray-400 break-words"
          >
            <strong
              v-if="props.replyingTo"
              class="font-bold text-base-moderate-blue"
            >{{ `@${props.replyingTo}` }}</strong> {{ props.content }}
          </p>
        </div>

        <UButton
          v-if="isEditing"
          class="self-end px-8 py-3 transition-colors"
          color="base"
          label="UPDATE"
          @click="handleUpdateComment"
        />
      </div>

      <!-- Comment Actions  -->
      <div class="absolute right-2 bottom-[30px] sm:top-4 h-fit">
        <UButton
          v-if="!isCommentAuthor"
          icon="i-ic-baseline-reply"
          size="sm"
          color="base"
          variant="link"
          label="Reply"
          @click="handleReply(props)"
        />
        <UButton
          v-if="isCommentAuthor"
          icon="i-material-symbols-delete"
          size="sm"
          color="red"
          variant="link"
          label="Delete"
          @click="emit('delete')"
        />
        <UButton
          v-if="!isEditing && isCommentAuthor"
          icon="i-material-symbols-edit"
          size="sm"
          color="base"
          variant="link"
          label="Edit"
          @click="isEditing = true"
        />
        <UButton
          v-if="isEditing"
          icon="i-material-symbols-cancel"
          size="sm"
          color="red"
          variant="link"
          label="Cancel"
          @click="isEditing = false"
        />
      </div>
    </template>

    <!-- new comment -->
    <template v-else>
      <div class="flex flex-wrap justify-between w-full items-start sm:flex-nowrap gap-6 lg:gap-3">
        <div class="order-2 flex-shrink-0 sm:order-none">
          <img
            class="size-10 rounded-full"
            :src="user.avatar_url"
            :alt="user.name"
            :title="user.name"
          >
        </div>

        <textarea
          v-if="isEditing || props.isNewComment"
          ref="textAreaRef"
          v-model="input"
          v-auto-animate
          v-focus
          rows="3"
          :spellcheck="isEditing ? true : false"
          class="border order-1 w-full resize-none border-gray-200 dark:focus:border-gray-600 dark:border-gray-700 dark:text-zinc-50 dark:bg-transparent rounded p-3 focus:outline-none focus:border focus:border-base-moderate-blue"
          :placeholder="props.replyingTo ? `Replying to @${props.replyingTo}` : 'Add a comment...'"
          required
        />

        <div class="flex w-28 flex-col gap-2 justify-end order-2">
          <UButton
            class="px-4 justify-center py-3"
            color="base"
            :label="isNewComment && props.isReplying ? 'REPLY' : 'SEND'"
            :disabled="!input"
            @click="handleSendComment"
          />
          <UButton
            v-if="props.isNewComment && props.isReplying"
            class="px-4 justify-center py-3"
            color="red"
            label="CANCEL"
            @click="handleCancelReply"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useTimeAgo } from "@vueuse/core"
import CommentScore from "./CommentScore.vue"
import type { CommentDBProps } from "@/types/db"
import type { GitHubUser } from "~/types/user"

interface ExtraProps {
  replyingTo?: string
  isReplying?: boolean
}

const props = withDefaults(defineProps<CommentDBProps & ExtraProps>(), {
  isNewComment: false,
  likes: 0,
  isReplying: false,
})

const emit = defineEmits<{
  send: [value: string]
  update: [value: string]
  delete: []
}>()

const isEditing = ref<boolean>(false)
const user: GitHubUser = await fetchGithubUser()

const {
  handleReply,
  handleCancelReply,
} = useComments()

const vFocus = {
  mounted: (el: any) => el.focus(),
}

const { textarea: textAreaRef, input } = useTextareaAutosize({
  input: props.content,
  styleProp: "minHeight",
})

const isCommentAuthor = computed(() => {
  return props.userId === user.id
})

const handleSendComment = () => {
  emit("send", input.value)
  input.value = ""
}

const handleUpdateComment = () => {
  emit("update", input.value)
  isEditing.value = false
}
</script>

<style lang="postcss" scoped>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>
