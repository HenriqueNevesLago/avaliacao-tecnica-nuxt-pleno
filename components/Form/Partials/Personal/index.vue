<template>
  <v-form ref="formRef" v-model="isValid" lazy-validation>
    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
          v-model="localModel.name"
          label="Nome"
          outlined
          :rules="nameRules"
          required
          :error-messages="nameErrors"
          @blur="validateName"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localModel.email"
          label="Email"
          outlined
          type="email"
          :rules="emailRules"
          required
          :error-messages="emailErrors"
          @blur="validateEmail"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localModel.phone"
          label="Telefone"
          outlined
          type="tel"
          :rules="requiredRules"
          required
          :error-messages="phoneErrors"
          @blur="validatePhone"
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

const nameErrors = ref([])
const emailErrors = ref([])
const phoneErrors = ref([])

const requiredRules = [
  v => !!v || 'Campo obrigatório'
]

const nameRules = [
  v => !!v || 'Nome é obrigatório',
  v => (v && v.length >= 3) || 'Nome deve ter no mínimo 3 caracteres'
]

const emailRules = [
  v => !!v || 'Email é obrigatório',
  v => /.+@.+\..+/.test(v) || 'Email deve ser válido'
]

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
  nameErrors.value = []
  emailErrors.value = []
  phoneErrors.value = []

  let valid = true

  if (!localModel.name) {
    nameErrors.value.push('Nome é obrigatório')
    valid = false
  } else if (localModel.name.length < 3) {
    nameErrors.value.push('Nome deve ter no mínimo 3 caracteres')
    valid = false
  }

  if (!localModel.email) {
    emailErrors.value.push('Email é obrigatório')
    valid = false
  } else if (!/.+@.+\..+/.test(localModel.email)) {
    emailErrors.value.push('Email deve ser válido')
    valid = false
  }

  if (!localModel.phone) {
    phoneErrors.value.push('Telefone é obrigatório')
    valid = false
  }

  return valid
}

function validateName() {
  nameErrors.value = []
  if (!localModel.name) {
    nameErrors.value.push('Nome é obrigatório')
  } else if (localModel.name.length < 3) {
    nameErrors.value.push('Nome deve ter no mínimo 3 caracteres')
  }
}

function validateEmail() {
  emailErrors.value = []
  if (!localModel.email) {
    emailErrors.value.push('Email é obrigatório')
  } else if (!/.+@.+\..+/.test(localModel.email)) {
    emailErrors.value.push('Email deve ser válido')
  }
}

function validatePhone() {
  phoneErrors.value = []
  if (!localModel.phone) {
    phoneErrors.value.push('Telefone é obrigatório')
  }
}

const showValidationErrors = () => {
  validateName()
  validateEmail()
  validatePhone()
}

defineExpose({ validate, showValidationErrors })
</script>
