<template>
  <q-table
    class="m-[8px]"
    bordered
    :title="props.title"
    :rows="props.data?.users || []"
    :columns="props.columns"
    row-key="id"
    v-if="props.data?.users?.length"
  >
    <!-- Body Cells -->
    <template v-for="col in props.columns" :key="col.name" v-slot:[`body-cell-${col.name}`]="scope">
      <q-td :props="scope">
        <div
          v-if="col.html"
          v-html="getCellValue(scope.row, col)"
          class="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis"
        />
        <div v-else>
          {{ getCellValue(scope.row, col) }}
        </div>
      </q-td>
    </template>

    <!-- Actions Slot -->
    <template v-if="props.actions?.length" v-slot:body-cell-actions="scope">
      <q-td align="center">
        <q-btn-dropdown @click.stop color="primary">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup v-if="props.actions.includes('update')">
              <q-item-section>
                <Button
                  class="bg-blue-500 hover:bg-blue-600 text-white"
                  icon="mdi-pencil"
                  size="sm"
                  @click="emit('update', scope.row)"
                />
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <Button
                  class="bg-rose-500 hover:bg-rose-600 text-white"
                  icon="mdi-delete"
                  size="sm"
                  @click="emit('delete', scope.row)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import type { QTableColumn } from 'quasar';
import { Button } from '../atoms';
import type { EventItem } from 'src/models/event';

/* =====================
   Types
===================== */
export interface CustomTableColumn<T extends Record<string, unknown>> extends Omit<
  QTableColumn<T>,
  'field'
> {
  html?: boolean;
  sortable?: boolean;
  sort?: (a: T, b: T) => number;
  align?: 'left' | 'right' | 'center';
  field: Extract<keyof T, string> | ((row: T) => string | number | boolean | undefined);
}

/* =====================
   Props
===================== */
const props = defineProps<{
  data: { users: EventItem[]; totalCount: number };
  columns: CustomTableColumn<EventItem>[];
  title?: string;
  actions?: Array<'update' | 'delete'>;
}>();

/* =====================
   Emits
===================== */
const emit = defineEmits<{
  (e: 'update', row: EventItem): void;
  (e: 'delete', row: EventItem): void;
  (e: 'page-change', page: number): void;
  (e: 'rows-per-page-change', rowsPerPage: number): void;
}>();

/* =====================
   Watch
===================== */
watch(
  () => props.data,
  (newData) => {
    console.log('Data updated:', newData);
  },
);

/* =====================
   Helpers
===================== */
function getCellValue(row: EventItem, col: CustomTableColumn<EventItem>) {
  if (typeof col.field === 'function') {
    return col.field(row); // вызываем функцию, если field это функция
  } else {
    return row[col.field]; // если field это ключ объекта
  }
}
</script>
