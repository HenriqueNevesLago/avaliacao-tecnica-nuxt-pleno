// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/styles' // Importa os estilos do Vuetify

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    // aqui você pode adicionar tema, icons, etc
  })

  nuxtApp.vueApp.use(vuetify)
})
