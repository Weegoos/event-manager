<script lang="ts" setup>
import { deleteEvent, getEvents, updateEvent, addEvent } from 'src/services/eventsStorage';
import { MoleculeDialog, Table } from 'src/components/molecules';
import { onMounted, ref, computed } from 'vue';
import type { EventItem, EventCategory, EventStatus } from 'src/models/event';
import { initEvents } from 'src/boot/initEvents';
import { formatDate } from 'src/composables/functions/formatDate';
import type { CustomTableColumn } from 'src/components/molecules/MoleculeTable.vue';
import { Button, Input, Select } from 'src/components/atoms';

const tableData = ref<EventItem[]>([]);
const tablePropsData = computed(() => ({
  users: tableData.value,
  totalCount: tableData.value.length,
}));

onMounted(() => {
  initEvents();
  tableData.value = getEvents();
});

// Категории и статусы
const categories: EventCategory[] = ['Conference', 'Meeting', 'Workshop'];
const statuses: EventStatus[] = ['Planned', 'Completed'];

const categoriesOptions = categories.map((c) => ({ label: c, value: c }));
const statusesOptions = statuses.map((s) => ({ label: s, value: s }));

// Столбцы таблицы
const columns: CustomTableColumn<EventItem>[] = [
  { name: 'id', label: 'ID', align: 'left', field: 'id' },
  { name: 'title', label: 'Title', align: 'left', field: 'title', sortable: true },
  {
    name: 'category',
    label: 'Category',
    align: 'left',
    field: (row: EventItem) => row.category,
    sortable: true,
  },
  {
    name: 'date',
    label: 'Date',
    align: 'left',
    field: (row: EventItem) => formatDate(row.date),
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: (row: EventItem) => row.status,
    sortable: true,
  },
  { name: 'actions', label: 'Actions', align: 'center', field: 'actions' },
];

// Диалог редактирования / добавления
const isDialogOpen = ref(false);
const editedEvent = ref<EventItem | null>(null);
const editedDescription = ref('');
const isDeleteConfirmOpen = ref(false);
const eventToDelete = ref<EventItem | null>(null);

const validationError = ref<string | null>(null);

// --- Функции ---
function onUpdate(row: EventItem) {
  editedEvent.value = { ...row };
  editedDescription.value = row.description ?? '';
  validationError.value = null;
  isDialogOpen.value = true;
}

function onAdd() {
  // Определяем максимальный id в текущих событиях
  const maxId = tableData.value.length ? Math.max(...tableData.value.map((e) => e.id)) : 0;

  const defaultCategory = categories[0] ?? 'Conference';
  const defaultStatus = statuses[0] ?? 'Planned';

  editedEvent.value = {
    id: maxId + 1,
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0] as string,
    category: defaultCategory,
    status: defaultStatus,
  };

  editedDescription.value = '';
  validationError.value = null;
  isDialogOpen.value = true;
}

function saveEdit() {
  if (!editedEvent.value) return;

  if (!editedEvent.value.title.trim()) {
    validationError.value = 'Title cannot be empty';
    return;
  }

  const selectedDate = new Date(editedEvent.value.date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (selectedDate < now) {
    validationError.value = 'Date cannot be in the past';
    return;
  }

  const updated: EventItem = {
    ...editedEvent.value,
    description: editedDescription.value,
  };

  const exists = tableData.value.find((e) => e.id === updated.id);
  if (exists) {
    updateEvent(updated);
  } else {
    addEvent(updated);
  }

  tableData.value = getEvents();
  isDialogOpen.value = false;
  validationError.value = null;
}

function confirmDelete(row: EventItem) {
  eventToDelete.value = row;
  isDeleteConfirmOpen.value = true;
}

function deleteConfirmed() {
  if (!eventToDelete.value) return;
  deleteEvent(eventToDelete.value.id);
  tableData.value = getEvents();
  isDeleteConfirmOpen.value = false;
}
</script>

<template>
  <div>
    <div class="mb-4">
      <Button :label="'Add Event'" color="primary" @click="onAdd" />
    </div>

    <Table
      :data="tablePropsData"
      :columns="columns"
      :actions="['update', 'delete']"
      @update="onUpdate"
      @delete="confirmDelete"
    />

    <!-- Диалог добавления/редактирования -->
    <MoleculeDialog v-model="isDialogOpen" style="min-width: 350px">
      <template #content>
        <div v-if="editedEvent">
          <div class="text-center text-bold text-2xl mb-4">
            {{ editedEvent.id ? 'Edit Event' : 'Add Event' }}
          </div>

          <Input v-model="editedEvent.title" label="Title" hint="Enter the event title" />
          <Input v-model="editedDescription" label="Description" hint="Optional description" />
          <Input v-model="editedEvent.date" label="Date" hint="Format: YYYY-MM-DD" type="date" />
          <Select v-model="editedEvent.category" :options="categoriesOptions" label="Category" />
          <Select v-model="editedEvent.status" :options="statusesOptions" label="Status" />

          <div v-if="validationError" class="text-red-500 mt-2">{{ validationError }}</div>
        </div>
      </template>

      <template #actions>
        <Button :label="'Save'" color="primary" @click="saveEdit" />
        <Button :label="'Close'" flat @click="isDialogOpen = false" />
      </template>
    </MoleculeDialog>

    <!-- Диалог подтверждения удаления -->
    <MoleculeDialog v-model="isDeleteConfirmOpen" style="min-width: 300px">
      <template #content>
        <div>Are you sure you want to delete the event "{{ eventToDelete?.title }}"?</div>
      </template>
      <template #actions>
        <Button :label="'Yes'" color="negative" @click="deleteConfirmed" />
        <Button :label="'No'" flat @click="isDeleteConfirmOpen = false" />
      </template>
    </MoleculeDialog>
  </div>
</template>
