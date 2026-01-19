<script lang="ts" setup>
type SelectOption = { label: string; value: string };

const props = defineProps<{
  modelValue: string | null;
  options: SelectOption[];
  label?: string;
  clearable?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
}>();
</script>

<template>
  <q-select
    :model-value="props.modelValue"
    :options="props.options"
    :label="props.label"
    :clearable="props.clearable"
    option-label="label"
    option-value="value"
    emit-value
    outlined
    dense
    map-options
    @update:model-value="(val) => emit('update:modelValue', val)"
  />
</template>
