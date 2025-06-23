// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    'vuetify/styles', // Importa os estilos do Vuetify
  ],
  build: {
    transpile: ['vuetify'], // Transpile o Vuetify para o build SSR funcionar
  },
  vite: {
    ssr: {
      noExternal: ['vuetify'], // Evita problema com SSR no Vuetify
    }
  }
})
