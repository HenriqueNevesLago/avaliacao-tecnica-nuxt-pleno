<template>
  <v-form ref="formRef" v-model="isValid" lazy-validation>
    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
          v-model="localModel.color"
          label="Cor"
          outlined
          :rules="requiredRules"
          required
          :error-messages="colorErrors"
          @blur="validateColor"
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

const colorErrors = ref([])

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
  colorErrors.value = []

  if (!localModel.color) {
    colorErrors.value.push('Cor é obrigatória')
    return false
  }
  return true
}

function validateColor() {
  colorErrors.value = []
  if (!localModel.color) colorErrors.value.push('Cor é obrigatória')
}

const showValidationErrors = () => {
  validateColor()
}

defineExpose({ validate, showValidationErrors })
</script>
