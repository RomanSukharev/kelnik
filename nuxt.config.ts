// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
  css: ['@/assets/scss/variables.css', '@/assets/styles/main.css'],
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
  ],

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: () => 'common',
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
                          @use "@/assets/scss/font_styles.scss" as *;
                          @use "@/assets/scss/variables.scss" as *;
                          `,
        },
      },
    },
  },

  components: {
    global: true,
    dirs: ['~/components'],
  },
})