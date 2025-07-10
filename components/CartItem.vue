<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar square>
        <img :src="item.product.image" style="height: 140px; max-width: 150px"/>
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label >{{ item.product.name }}</q-item-label>
      <q-item-label caption>
        {{ formatCurrency(item.product.price) }} x {{ item.quantity }}
      </q-item-label>
      <q-item-label >
        Total: {{ formatCurrency(itemTotal) }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div>
        <q-btn
          flat
          round
          icon="remove_circle_outline"
          color="negative"
          @click="decreaseQuantity"
          :disable="item.quantity === 1"
          size="sm"
        />
        <span class="text-body1 text-weight-medium">{{ item.quantity }}</span>
        <q-btn
          flat
          round
          icon="add_circle_outline"
          color="positive"
          @click="increaseQuantity"
          size="sm"
        />
        <q-btn
          flat
          round
          icon="delete"
          color="grey-7"
          @click="removeItem"
          size="sm"
        />
      </div>
    </q-item-section>
  </q-item>
  <q-separator />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import type { CartItem } from '~/models/CartItem';

const props = defineProps<{
  item: CartItem;
}>();

const emit = defineEmits(['updateQuantity', 'removeItem']);

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const itemTotal = computed(() => {
  return props.item.product.price * props.item.quantity;
});

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    emit('updateQuantity', { id: props.item.product.id, quantity: props.item.quantity - 1 });
  } else {
    removeItem();
  }
};

const increaseQuantity = () => {
  emit('updateQuantity', { id: props.item.product.id, quantity: props.item.quantity + 1 });
};

const removeItem = () => {
  emit('removeItem', props.item.product.id);
};
</script>
