import type { GitHubUser } from "@/types/user"

export const useGithubCookie = () => useCookie("gh_token")

export const githubFetch = (url: string, fetchOptions: any = {}) => {
  return $fetch(url, {
    baseURL: "https://api.github.com",
    ...fetchOptions,
    headers: {
      Authorization: `token ${useGithubCookie().value}`,
      ...fetchOptions.headers,
    },
  })
}

export const fetchGithubUser = async () => {
  const cookie = useGithubCookie()
  const user = useState("gh_user")
  if (cookie.value && !user.value) {
    user.value = await githubFetch("/user")
  }
  return user.value as GitHubUser
}

export const githubLogin = async () => {
  try {
    if (import.meta.client) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const { github } = useRuntimeConfig().public
      window.location.replace(
        `https://github.com/login/oauth/authorize?client_id=${github.clientId}&scope=public_repo`,
      )
    }
  }
  catch (error) {
    console.error("Login failed:", error)
  }
}

export const githubLogout = async () => {
  useGithubCookie().value = null
  useState("gh_user").value = null
}
