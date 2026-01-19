<template>
  <q-btn
    :color="props.color"
    :icon="props.icon"
    :label="props.label"
    no-caps
    :flat="props.flat"
    @click="emit('emitClick')"
  >
    <slot />
  </q-btn>
</template>

<script setup lang="ts">
type Props = {
  color?: string;
  label?: string | number;
  icon?: string;
  flat?: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'emitClick'): void;
}>();
</script>
