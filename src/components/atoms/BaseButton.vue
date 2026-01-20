<template>
  <button
    class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="btnClasses"
    @click="emit('emitClick')"
  >
    <svg
      v-if="props.icon"
      class="w-4 h-4 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        v-if="props.icon === 'save'"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v3a2 2 0 01-2 2H7V7a3 3 0 016 0z"
      />
    </svg>

    <span v-if="props.label" class="whitespace-nowrap">{{ props.label }}</span>

    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ColorType = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray' | 'negative';

type Props = {
  color?: ColorType;
  label?: string | number;
  icon?: string;
  flat?: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'emitClick'): void;
}>();

const btnClasses = computed(() => {
  const colors: Record<ColorType, string> = {
    primary:
      'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500 shadow-sm shadow-blue-200/50 hover:shadow-md',
    secondary:
      'bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-500 shadow-sm shadow-slate-200/50 hover:shadow-md',
    success:
      'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500 shadow-sm shadow-green-200/50 hover:shadow-md',
    warning:
      'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500 shadow-sm shadow-yellow-200/50 hover:shadow-md',
    error:
      'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-sm shadow-red-200/50 hover:shadow-md',
    gray: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500 shadow-sm shadow-gray-200/50 hover:shadow-md',
    negative:
      'bg-red-400 hover:bg-red-500 text-white focus:ring-red-400 shadow-sm shadow-red-200/50 hover:shadow-md',
  };

  const colorClass = colors[props.color ?? 'secondary'];

  if (props.flat) {
    return `bg-transparent border hover:bg-current/10 ${colorClass
      .replace(/bg-.*? /, '')
      .replace(/shadow.*? /g, '')
      .replace(/text-.*? /, '')} border-current focus:ring-current`;
  }

  return `${colorClass} focus:ring-offset-2 focus:ring-offset-2`;
});
</script>
