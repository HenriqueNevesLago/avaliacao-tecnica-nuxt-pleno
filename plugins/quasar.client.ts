import { Quasar, QBtn, QCard, QInput } from 'quasar'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Quasar, {
    components: { QBtn, QCard, QInput }, // registrar só os que precisa
    plugins: {}
  })
})