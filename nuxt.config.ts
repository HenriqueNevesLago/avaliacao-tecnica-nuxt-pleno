// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@quasar/nuxt'],
  quasar: {
    importStrategy: 'all', // importa tudo automático
    plugins: {}
  },
  css: [
    'quasar/src/css/index.sass',
    '@quasar/extras/material-icons/material-icons.css',
  ]
})
