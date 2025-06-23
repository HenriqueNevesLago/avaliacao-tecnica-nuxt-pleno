<template>
  <v-app>
    <v-main>
      <v-container>
        <ModalDefault>
           <template #default>
              <Form />
            </template>
        </ModalDefault>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import ModalDefault from '@/components/ModalDefault/index.vue'
import Form from '@/components/Form/index.vue'

</script>
