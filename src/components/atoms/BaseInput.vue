<template>
  <div class="flex flex-col gap-1 w-full">
    <label class="text-xs font-medium text-slate-500">
      {{ props.label }}
    </label>

    <div class="relative w-full">
      <input
        v-model="localValue"
        :placeholder="props.label"
        class="w-full bg-slate-50 text-slate-800 text-sm border border-slate-200 rounded-lg pl-3 pr-10 py-2 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:ring-offset-0 peer"
      />

      <button
        v-if="localValue"
        type="button"
        @click="clear"
        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer opacity-0 peer-focus:opacity-100 peer-valid:opacity-100 group-hover:opacity-100"
        title="Clear"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <p v-if="props.hint" class="text-xs text-slate-500 mt-1">
      {{ props.hint }}
    </p>

    <div class="text-xs text-slate-500">{{ localValue.length }}/∞</div>
  </div>
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
