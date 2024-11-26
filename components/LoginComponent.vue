<template>
  <div
    class="rounded-xl ring-1 ring-gray-200 dark:ring-gray-800 shadow max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur"
  >
    <div class="px-4 py-5 sm:p-6">
      <div class="w-full max-w-sm space-y-6">
        <div class="text-center">
          <p class="text-2xl text-gray-900 dark:text-white font-bold">
            Login
          </p>
          <div class="text-gray-500 dark:text-gray-400 mt-1">
            Use your GitHub account to sign in and comment!
          </div>
        </div>

        <div class="flex flex-col">
          <div class="space-y-3">
            <UButton
              icon="i-mdi-github"
              size="lg"
              block
              :loading="isSignIn"
              class="rounded-full"
              color="white"
              variant="solid"
              :label="isSignIn ? 'Please wait...' : 'Continue with Github'"
              @click="handleLogin"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isSignIn = ref<boolean>(false)

const handleLogin = async () => {
  try {
    isSignIn.value = true
    await githubLogin()
    const user = await fetchGithubUser()
    if (user) {
      console.log("Login bem-sucedido:", user)
      isSignIn.value = false
    }
  }
  catch (error) {
    console.error("Erro ao fazer login:", error)
    isSignIn.value = false
  }
}
</script>
