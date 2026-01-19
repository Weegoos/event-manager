<script lang="ts" setup>
import { deleteEvent, getEvents } from 'src/services/eventsStorage';
import { Table } from 'src/components/molecules';
import { onMounted, ref, computed } from 'vue';
import type { EventItem } from 'src/models/event';
import { initEvents } from 'src/boot/initEvents';
import { formatDate } from 'src/composables/functions/formatDate';
import type { CustomTableColumn } from 'src/components/molecules/MoleculeTable.vue';

const tableData = ref<EventItem[]>([]);

const tablePropsData = computed(() => ({
  users: tableData.value,
  totalCount: tableData.value.length,
}));

onMounted(() => {
  initEvents();
  tableData.value = getEvents();
});

// Столбцы таблицы
const columns: CustomTableColumn<EventItem>[] = [
  { name: 'id', label: 'ID', align: 'left', field: 'id' },
  { name: 'title', label: 'Title', align: 'left', field: 'title', sortable: true },
  { name: 'category', label: 'Category', align: 'left', field: 'category', sortable: true },
  {
    name: 'date',
    label: 'Date',
    align: 'left',
    sortable: true,
    field: (row: EventItem) => formatDate(row.date),
  },
  { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
  { name: 'actions', label: 'Actions', align: 'center', field: 'actions' },
];

function onUpdate(row: EventItem) {
  console.log('Update', row);
}

function onDelete(row: EventItem) {
  console.log('Delete', row.id);
  deleteEvent(row.id);
  tableData.value = getEvents();
}
</script>

<template>
  <div>
    <Table
      :data="tablePropsData"
      :columns="columns"
      :actions="['update', 'delete']"
      @update="onUpdate"
      @delete="onDelete"
    />
  </div>
</template>
