interface ResponseProps {
  access_token: string
  token_type: string
  scope: string
  error: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const { code } = getQuery(event)

  if (!code) {
    return sendRedirect(event, "/")
  }

  const redirectTo = getCookie(event, "redirectTo")

  const response: ResponseProps = await $fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      body: {
        client_id: config.public.github.clientId,
        client_secret: config.github.clientSecret,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    },
  )

  if (response.error) {
    return sendRedirect(event, "/")
  }

  const token = response.access_token

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  setCookie(event, "gh_token", token, {
    path: "/",
    maxAge: cookieExpiresInSeconds,
  })

  return sendRedirect(event, redirectTo ?? "/")
})
