<script lang="ts" setup>
import { getEvents } from 'src/services/eventsStorage';
import { Table } from 'src/components/molecules';
import { onMounted, ref, computed } from 'vue';
import type { EventItem } from 'src/models/event';
import { initEvents } from 'src/boot/initEvents';

const tableData = ref<EventItem[]>([]);

const tablePropsData = computed(() => ({
  users: tableData.value,
  totalCount: tableData.value.length,
}));

onMounted(() => {
  initEvents();
  tableData.value = getEvents();
});
</script>

<template>
  <div>
    <Table
      :data="tablePropsData"
      :columns="[
        { name: 'id', label: 'ID', align: 'left', field: 'id' },
        { name: 'title', label: 'Title', align: 'left', field: 'title', sortable: true },
        { name: 'category', label: 'Category', align: 'left', field: 'category', sortable: true },
        { name: 'date', label: 'Date', align: 'left', field: 'date', sortable: true },
        { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
      ]"
    />
  </div>
</template>
