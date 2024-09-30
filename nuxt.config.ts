// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/base.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxthub/core",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@formkit/auto-animate/nuxt",
  ],

  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      stylistic: {
        quotes: "double",
      },
    },
  },

  googleFonts: {
    families: {
      Rubik: [400, 500, 700],
    },
  },

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    disableTransition: true,
  },

  // Nuxt Hub
  hub: {
    cache: true,
    kv: true,
    database: true,
    analytics: true,
  },

  runtimeConfig: {
    public: {
      github: {
        clientId: process.env.NUXT_PUBLIC_GITHUB_CLIENT_ID,
      },
    },
    github: {
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    },
  },

  compatibilityDate: "2024-08-30",
  ssr: false,
})
