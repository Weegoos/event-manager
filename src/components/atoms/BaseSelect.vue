<template>
  <q-select
    outlined
    dense
    v-bind="$attrs"
    v-model="localValue"
    :options="options"
    :label="label"
    :hint="hint"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  modelValue: string | number;
  options: Array<{ label: string; value: string | number }>;
  label?: string;
  hint?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

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
</script>

<style scoped></style>
