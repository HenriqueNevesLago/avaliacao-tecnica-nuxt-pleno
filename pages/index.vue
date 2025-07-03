<template>
  <q-page class="flex flex-center bg-grey-2 q-pa-md">
    <q-card class="q-pa-lg shadow-2 rounded-borders" style="max-width: 700px; width: 100%">
      <q-card-section>
        <div class="text-h5 text-primary q-mb-sm">
          👋 Bem-vindo à sua Prova Técnica
        </div>
        <div class="text-body1 text-grey-8">
          Olá! Obrigado por participar do nosso processo seletivo. Criamos este desafio para conhecer melhor suas habilidades com
          <strong>Vue 3</strong>, <strong>Nuxt 3</strong> e <strong>boas práticas de front-end</strong>.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="bg-blue-1 text-blue-10 q-mt-md rounded-borders">
        <div class="text-subtitle2">
          <q-icon name="info" class="q-mr-sm" />
          <QBtnTeste />
        </div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup lang="ts">
// Import component
import QBtnTeste from '~/components/QBtnTeste.vue';
</script>
