<template>
  <q-card >
    <img :src="product.image" :alt="product.name" style="height: 200px; max-width: 100%; object-fit: contain;">
    <q-card-section class="q-pa-sm">
      <div>
        <div class="text-center text-weight-bold">{{ product.name }}</div>
        <div>{{ product.description }}</div>
        <div >
          {{ formatCurrency(product.price) }}
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Adicionar ao Carrinho"
          icon="add_shopping_cart"
          @click="addToCart"
          class="full-width"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Product } from '~/models/Product';

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits(['addToCart']);

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const addToCart = () => {
  emit('addToCart', props.product);
  console.log("emitiu para o componente pai", props.product)
};
</script>