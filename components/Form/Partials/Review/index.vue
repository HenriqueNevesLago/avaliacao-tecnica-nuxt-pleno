<template>
  <v-row>
    <v-col cols="12">
      <h2>Revisar Dados</h2>
    </v-col>

    <v-col cols="12" md="6">
      <h3>Dados Pessoais</h3>
      <p><strong>Nome:</strong> {{ form.personal.name }}</p>
      <p><strong>Email:</strong> {{ form.personal.email }}</p>
      <p><strong>Telefone:</strong> {{ form.personal.phone }}</p>
    </v-col>

    <v-col cols="12" md="6">
      <h3>Endereço</h3>
      <p><strong>Rua:</strong> {{ form.address.street }}</p>
      <p><strong>Número:</strong> {{ form.address.number }}</p>
      <p><strong>Bairro:</strong> {{ form.address.neighborhood }}</p>
      <p><strong>Cidade:</strong> {{ form.address.city }}</p>
      <p><strong>Estado:</strong> {{ form.address.state }}</p>
      <p><strong>CEP:</strong> {{ form.address.zipcode }}</p>
    </v-col>

    <v-col cols="12" md="6">
      <h3>Preferências</h3>
      <p><strong>Cor:</strong> {{ form.preferences.color }}</p>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})

</script>
