// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    "destyle.css",
    "@/assets/css/style.sass"
  ],

  modules: [
    'nuxt-icon',
    ['@nuxtjs/google-fonts', {
      families: {
        'Noto+Sans+JP': true,
      },
    }],
  ],
  app: {
    // Remove googleFonts from here
  },
  compatibilityDate: "2024-12-28"
})
