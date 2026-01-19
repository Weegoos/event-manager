<template>
  <q-input outlined dense bottom-slots v-model="localValue" :label="props.label" counter>
    <template v-slot:append>
      <q-icon name="close" @click="clear" class="cursor-pointer" />
    </template>
    <template v-slot:hint>{{ props.hint }}</template>
  </q-input>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  modelValue: string;
  label: string;
  hint?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const localValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    localValue.value = newVal;
  },
);

watch(localValue, (val) => {
  emit('update:modelValue', val);
});

function clear() {
  localValue.value = '';
}
</script>
