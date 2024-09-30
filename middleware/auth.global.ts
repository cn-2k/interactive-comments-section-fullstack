export default defineNuxtRouteMiddleware((to) => {
  const cookie = useCookie("gh_token")

  if (to.path === "/login" && cookie.value) {
    return navigateTo("/")
  }
  else if (to.path === "/" && !cookie.value) {
    return navigateTo("/login")
  }
})
