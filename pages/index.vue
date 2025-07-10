<template>
  <q-layout class="fullscreen">
    <q-page-container>
      <q-page class="q-pa-md">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-md-8">
            <div class="row q-col-gutter-md">
              <div v-for="product in products" :key="product.id" class="col-xs-12 col-sm-6 col-md-4">
                <ProductCard :product="product" @add-to-cart="handleAddToCart" />
              </div>
            </div>
          </div>

          <div class="col-xs-12 col-md-4 gt-sm">
            <q-card>
              <q-card-section>
                <div class="text-center text-h6 text-weight-bold">Seu Carrinho</div>
              </q-card-section>
              <q-separator />
              <q-list separator v-if="hasItemsToshow">
                <CartItemComponent
                  v-for="item in cartItems"
                  :key="item.product.id"
                  :item="item"
                  @update-quantity="handleUpdateCartItemQuantity"
                  @remove-item="handleRemoveCartItem"
                />
              </q-list>
              <q-card-section v-else class="text-center text-grey">
                Seu carrinho está vazio.
              </q-card-section>
              <q-separator />
              <q-card-section v-if="hasItemsToshow" class="text-right">
                <div class="text-h6 text-weight-bold">Total: {{ formatCurrency(cartTotal) }}</div>
                <q-btn color="positive" label="Finalizar Compra" icon="check_circle" class="q-mt-md" />
              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-drawer v-model="showCartDrawer" side="right" bordered overlay behavior="mobile">
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>Seu Carrinho</q-toolbar-title>
            <q-btn flat round icon="close" @click="showCartDrawer = false" />
          </q-toolbar>
          <q-separator />
          <q-list separator v-if="hasItemsToshow">
            <CartItemComponent
              v-for="item in cartItems"
              :key="item.product.id"
              :item="item"
              @update-quantity="handleUpdateCartItemQuantity"
              @remove-item="handleRemoveCartItem"
            />
          </q-list>
          <q-card-section v-else class="text-center text-grey">
            Seu carrinho está vazio.
          </q-card-section>
          <q-separator />
          <q-card-section v-if="cartItems.length > 0" class="text-right">
            <div class="text-h6 text-weight-bold">Total: {{ formatCurrency(cartTotal) }}</div>
            <q-btn color="positive" label="Finalizar Compra" icon="check_circle" class="q-mt-md full-width" />
          </q-card-section>
        </q-drawer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import ProductCard from '~/components/ProductCard.vue';
import CartItemComponent from '~/components/CartItem.vue';

import productsData from '~/mock/products.json';
import type { CartItem } from '~/models/CartItem';
import type { Product } from '~/models/Product';


const products = ref<Product[]>(productsData.products); 
const cartItems = ref<CartItem[]>([]); 
const showCartDrawer = ref(false); 

onMounted(() => {
  const storedCart = localStorage.getItem('shoppingCart');
  if (storedCart) {
    try {
      cartItems.value = JSON.parse(storedCart);
    } catch (e) {
      console.error("Erro ao carregar carrinho do localStorage:", e);
      cartItems.value = [];
    }
  }
});

watch(cartItems, (newVal) => {
  localStorage.setItem('shoppingCart', JSON.stringify(newVal));
}, { deep: true });


const totalCartItems = computed(() => cartItems.value.length);

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
});

const hasItemsToshow = computed(() => cartItems.value.length > 0)


const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};


const handleAddToCart = (product: Product) => {
  const existingItem = cartItems.value.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({ product, quantity: 1 });
  }
  
  if (window.innerWidth < 1024) { 
    console.log("entrou aqui")
    showCartDrawer.value = true;
  }
}


const handleUpdateCartItemQuantity = ({ id, quantity }: { id: number, quantity: number }) => {
  const itemToUpdate = cartItems.value.find(item => item.product.id === id);
  if (itemToUpdate) {
    itemToUpdate.quantity = quantity;
    if (itemToUpdate.quantity <= 0) {
      handleRemoveCartItem(id);
    }
  }
};

const handleRemoveCartItem = (id: number) => {
  cartItems.value = cartItems.value.filter(item => item.product.id !== id);
};
</script>
