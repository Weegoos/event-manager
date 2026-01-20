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

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const value = target.value === '' ? null : target.value;
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="props.label" class="text-xs font-medium text-slate-500">
      {{ props.label }}
    </label>

    <div class="relative w-full">
      <select
        class="w-full bg-slate-50 text-slate-800 text-sm border border-slate-200 rounded-lg pl-3 pr-9 py-2 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none cursor-pointer"
        :value="props.modelValue ?? ''"
        @change="onChange"
      >
        <option v-if="props.clearable" value=""></option>

        <option v-for="option in props.options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- стрелка -->
      <span class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400">
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>
  </div>
</template>
