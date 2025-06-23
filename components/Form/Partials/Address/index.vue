<template>
  <v-form ref="formRef" v-model="isValid" lazy-validation>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localModel.street"
          label="Rua"
          outlined
          :rules="requiredRules"
          required
          :error-messages="streetErrors"
          @blur="validateStreet"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localModel.number"
          label="Número"
          outlined
          :rules="requiredRules"
          required
          :error-messages="numberErrors"
          @blur="validateNumber"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localModel.neighborhood"
          label="Bairro"
          outlined
          :rules="requiredRules"
          required
          :error-messages="neighborhoodErrors"
          @blur="validateNeighborhood"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localModel.city"
          label="Cidade"
          outlined
          :rules="requiredRules"
          required
          :error-messages="cityErrors"
          @blur="validateCity"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localModel.state"
          label="Estado"
          outlined
          :rules="requiredRules"
          required
          :error-messages="stateErrors"
          @blur="validateState"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localModel.zipcode"
          label="CEP"
          outlined
          :rules="requiredRules"
          required
          :error-messages="zipcodeErrors"
          @blur="validateZipcode"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'

const props = defineProps({
  modelValue: Object
})
const emit = defineEmits(['update:model-value'])

const localModel = reactive({ ...props.modelValue })
const formRef = ref(null)
const isValid = ref(false)

const requiredRules = [
  v => !!v || 'Campo obrigatório'
]

const streetErrors = ref([])
const numberErrors = ref([])
const neighborhoodErrors = ref([])
const cityErrors = ref([])
const stateErrors = ref([])
const zipcodeErrors = ref([])

// Watch sincroniza dados com pai
watch(
  () => props.modelValue,
  (newVal) => {
    Object.assign(localModel, newVal)
  }
)

watch(
  localModel,
  (newVal) => {
    emit('update:model-value', { ...newVal })
  },
  { deep: true }
)

const validate = () => {
  let valid = true

  streetErrors.value = []
  numberErrors.value = []
  neighborhoodErrors.value = []
  cityErrors.value = []
  stateErrors.value = []
  zipcodeErrors.value = []

  if (!localModel.street) {
    streetErrors.value.push('Rua é obrigatória')
    valid = false
  }
  if (!localModel.number) {
    numberErrors.value.push('Número é obrigatório')
    valid = false
  }
  if (!localModel.neighborhood) {
    neighborhoodErrors.value.push('Bairro é obrigatório')
    valid = false
  }
  if (!localModel.city) {
    cityErrors.value.push('Cidade é obrigatória')
    valid = false
  }
  if (!localModel.state) {
    stateErrors.value.push('Estado é obrigatório')
    valid = false
  }
  if (!localModel.zipcode) {
    zipcodeErrors.value.push('CEP é obrigatório')
    valid = false
  }

  return valid
}

function validateStreet() {
  streetErrors.value = []
  if (!localModel.street) streetErrors.value.push('Rua é obrigatória')
}
function validateNumber() {
  numberErrors.value = []
  if (!localModel.number) numberErrors.value.push('Número é obrigatório')
}
function validateNeighborhood() {
  neighborhoodErrors.value = []
  if (!localModel.neighborhood) neighborhoodErrors.value.push('Bairro é obrigatório')
}
function validateCity() {
  cityErrors.value = []
  if (!localModel.city) cityErrors.value.push('Cidade é obrigatória')
}
function validateState() {
  stateErrors.value = []
  if (!localModel.state) stateErrors.value.push('Estado é obrigatório')
}
function validateZipcode() {
  zipcodeErrors.value = []
  if (!localModel.zipcode) zipcodeErrors.value.push('CEP é obrigatório')
}

const showValidationErrors = () => {
  validateStreet()
  validateNumber()
  validateNeighborhood()
  validateCity()
  validateState()
  validateZipcode()
}

defineExpose({ validate, showValidationErrors })
</script>
