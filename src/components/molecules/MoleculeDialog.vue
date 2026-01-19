<template>
  <div>
    <q-dialog v-model="localValue" persistent>
      <q-card>
        <q-card-section>
          <slot name="content" />
        </q-card-section>
        <q-card-actions align="right">
          <slot name="actions" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();

const localValue = ref<boolean>(props.modelValue);

watch(
  () => props.modelValue,
  (newVal: boolean) => {
    localValue.value = newVal;
  },
);
</script>

<style scoped></style>
