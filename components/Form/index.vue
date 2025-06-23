<template>
  <v-container>
    <v-card class="card-form">
      <v-row>
        <v-col cols="12">
          <h1>Formulário</h1>
        </v-col>
      </v-row>
      <component
        :is="currentStepComponent"
        v-bind="stepKeys[currentStep] === 'review' ? { form } : { 'model-value': form[stepKeys[currentStep]] }"
        @update:model-value="updateStepData"
        @submit="submit"
        ref="stepRef"
     />
      <v-row>
        <v-col cols="12" class="d-flex justify-space-between">
          <v-btn :disabled="currentStep === 0" @click="prevStep">Voltar</v-btn>
          <v-btn
            v-if="currentStep < stepKeys.length - 1"
            @click="nextStep"
          >Próximo</v-btn>
          <v-btn v-else @click="submit">Enviar</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import Personal from './Partials/Personal/index.vue'
import Address from './Partials/Address/index.vue'
import Preferences from './Partials/Preferences/index.vue'
import Review from './Partials/Review/index.vue'

const form = reactive({
  personal: { name: '', email: '', phone: '' },
  address: { street: '', number: '', neighborhood: '', city: '', state: '', zipcode: '' },
  preferences: { color: '' }
})

const stepKeys = ['personal', 'address', 'preferences', 'review']
const stepComponents = {
  personal: Personal,
  address: Address,
  preferences: Preferences,
  review: Review
}

const currentStep = ref(0)
const stepRef = ref(null)

const currentStepComponent = computed(() => stepComponents[stepKeys[currentStep.value]])

function updateStepData(data) {
  const key = stepKeys[currentStep.value]
  if (key !== 'review') {
    Object.assign(form[key], data)
  }
}

function nextStep() {
  if (stepRef.value?.validate && stepRef.value.validate()) {
    if (currentStep.value < stepKeys.length - 1) {
      currentStep.value++
    }
  } else {
    stepRef.value?.showValidationErrors?.()
  }
}

function prevStep() {
  if (currentStep.value > 0) currentStep.value--
}

function submit() {
  alert('Form enviado! Veja os dados no console.')
  console.log(JSON.parse(JSON.stringify(form)))
}
</script>

<style src="./index.scss" scoped />


