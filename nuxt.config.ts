// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxthub/core",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@formkit/auto-animate/nuxt",
  ],
  ssr: false,
  devtools: { enabled: true },
  css: ["@/assets/css/base.css"],

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    disableTransition: true,
  },

  runtimeConfig: {
    public: {
      github: {
        clientId: process.env.NUXT_PUBLIC_GITHUB_CLIENT_ID,
      },
      nodeEnv: process.env.NODE_ENV,
      public: {
        apiBaseURL: process.env.NODE_ENV === "production"
          ? process.env.API_BASE_URL
          : "http://localhost:3000",
      },
    },
    github: {
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-08-30",
  nitro: {
    experimental: {
      openAPI: true,
    },
  },

  // Nuxt Hub
  hub: {
    cache: true,
    kv: true,
    database: true,
    analytics: true,
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
})
