// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'quasar/src/css/index.sass',
    '@quasar/extras/material-icons/material-icons.css'
  ],
  vite: {
    ssr: {
      noExternal: ['quasar']
    }
  }
})