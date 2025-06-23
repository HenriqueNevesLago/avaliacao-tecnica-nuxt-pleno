<template>
  <v-dialog max-width="600" v-model="isActive">
    <template #activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="primary" variant="flat">
        Abrir Formulário
      </v-btn>
    </template>

    <template #default>
      <slot :close="close" />
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const isActive = ref(false)

function close() {
  isActive.value = false
}
</script>
