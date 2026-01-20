<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { MoleculeDialog, Table } from 'src/components/molecules';
import { Button, Input, Select } from 'src/components/atoms';
import { initEvents } from 'src/boot/initEvents';
import { deleteEvent, getEvents, updateEvent, addEvent } from 'src/services/eventsStorage';
import { formatDate } from 'src/composables/functions/formatDate';
import type { EventItem, EventCategory, EventStatus } from 'src/models/event';
import type { CustomTableColumn } from 'src/components/molecules/MoleculeTable.vue';

// types
type SelectOption = { label: string; value: string };

// static data
const categories: EventCategory[] = ['Conference', 'Meeting', 'Workshop'];
const statuses: EventStatus[] = ['Planned', 'Completed'];

const categoryOptions: SelectOption[] = categories.map((category) => ({
  label: category,
  value: category,
}));

const statusOptions: SelectOption[] = statuses.map((status) => ({
  label: status,
  value: status,
}));

// state
const tableData = ref<EventItem[]>([]);
const searchQuery = ref('');
const filterCategory = ref<string | null>(null);
const filterStatus = ref<string | null>(null);

const isDialogOpen = ref(false);
const editedEvent = ref<EventItem | null>(null);
const editedDescription = ref('');
const validationError = ref<string | null>(null);

const isDeleteConfirmOpen = ref(false);
const eventToDelete = ref<EventItem | null>(null);

// lifecycle
onMounted(() => {
  initEvents();
  tableData.value = getEvents();
});

// computed
const filteredData = computed(() => {
  const search = searchQuery.value.trim().toLowerCase();
  const filterCat = filterCategory.value?.toLowerCase() ?? null;
  const filterStat = filterStatus.value?.toLowerCase() ?? null;

  return tableData.value.filter((event) => {
    const title = (event.title ?? '').toLowerCase();
    const category = (event.category ?? '').toLowerCase();
    const status = (event.status ?? '').toLowerCase();

    const matchesSearch = !search || title.includes(search);
    const matchesCategory = filterCat == null || category === filterCat;
    const matchesStatus = filterStat == null || status === filterStat;

    return matchesSearch && matchesCategory && matchesStatus;
  });
});

const tablePropsData = computed(() => ({
  users: filteredData.value,
  totalCount: filteredData.value.length,
}));

const columns: CustomTableColumn<EventItem>[] = [
  { name: 'id', label: 'ID', align: 'left', field: 'id' },
  { name: 'title', label: 'Title', align: 'left', field: 'title', sortable: true },
  {
    name: 'category',
    label: 'Category',
    align: 'left',
    field: (row) => row.category,
    sortable: true,
  },
  {
    name: 'date',
    label: 'Date',
    align: 'left',
    field: (row) => formatDate(row.date),
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: (row) => row.status,
    sortable: true,
  },
  { name: 'actions', label: 'Actions', align: 'center', field: 'actions' },
];

// methods
function openEditDialog(row: EventItem) {
  editedEvent.value = { ...row };
  editedDescription.value = row.description ?? '';
  validationError.value = null;
  isDialogOpen.value = true;
}

function openAddDialog() {
  const maxId = tableData.value.length ? Math.max(...tableData.value.map((event) => event.id)) : 0;

  editedEvent.value = {
    id: maxId + 1,
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0] || '',
    category: categories[0] ?? 'Conference',
    status: statuses[0] ?? 'Planned',
  };

  editedDescription.value = '';
  validationError.value = null;
  isDialogOpen.value = true;
}

function saveEvent() {
  if (!editedEvent.value) return;

  if (!editedEvent.value.title.trim()) {
    validationError.value = 'Title cannot be empty';
    return;
  }

  const selectedDate = new Date(editedEvent.value.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    validationError.value = 'Date cannot be in the past';
    return;
  }

  const updatedEvent: EventItem = {
    ...editedEvent.value,
    description: editedDescription.value,
  };

  const exists = tableData.value.some((event) => event.id === updatedEvent.id);

  if (exists) {
    updateEvent(updatedEvent);
  } else {
    addEvent(updatedEvent);
  }

  tableData.value = getEvents();
  isDialogOpen.value = false;
  validationError.value = null;
}

function openDeleteDialog(row: EventItem) {
  eventToDelete.value = row;
  isDeleteConfirmOpen.value = true;
}

function deleteEventConfirmed() {
  if (!eventToDelete.value) return;

  deleteEvent(eventToDelete.value.id);
  tableData.value = getEvents();
  isDeleteConfirmOpen.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 px-4 py-6 lg:px-8">
    <!-- Page header -->
    <header class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900">Events</h1>
        <p class="mt-1 text-sm text-slate-500">Manage and track your upcoming events.</p>
      </div>

      <!-- КНОПКА ВСЕГДА ВИДИМА -->
      <Button label="Add Event" color="primary" class="shrink-0" @click="openAddDialog" />
    </header>

    <!-- Filter + table card -->
    <div class="space-y-4">
      <!-- Filter panel -->
      <section
        class="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:flex-row md:items-end md:justify-between"
      >
        <div class="grid w-full gap-3 md:grid-cols-3 lg:grid-cols-4">
          <Input
            v-model="searchQuery"
            label="Search"
            placeholder="Search by title..."
            class="w-full"
          />

          <Select
            v-model="filterCategory"
            :options="categoryOptions"
            label="Category"
            clearable
            class="w-full"
          />

          <Select
            v-model="filterStatus"
            :options="statusOptions"
            label="Status"
            clearable
            class="w-full"
          />
        </div>

        <!-- Reset button only -->
        <div class="flex w-full justify-end md:w-auto">
          <Button
            label="Reset"
            flat
            class="w-full md:w-auto"
            @click="
              () => {
                searchQuery = '';
                filterCategory = null;
                filterStatus = null;
              }
            "
          />
        </div>
      </section>

      <!-- Table card -->
      <section class="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <div class="border-b border-slate-100 px-4 py-3 text-sm text-slate-500">
          {{ tablePropsData.totalCount }} events found
        </div>

        <div class="p-2 md:p-4">
          <Table
            :data="tablePropsData"
            :columns="columns"
            :actions="['update', 'delete']"
            @update="openEditDialog"
            @delete="openDeleteDialog"
          />
        </div>
      </section>
    </div>

    <!-- остальной код диалогов без изменений -->
    <!-- Add / edit dialog -->
    <MoleculeDialog v-model="isDialogOpen" class="!max-w-lg">
      <template #content>
        <div v-if="editedEvent" class="space-y-4">
          <div class="mb-2 text-center">
            <h2 class="text-xl font-semibold text-slate-900">
              {{ editedEvent.id ? 'Edit Event' : 'Add Event' }}
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              Fill in the details below to manage your event.
            </p>
          </div>

          <div class="space-y-3">
            <Input v-model="editedEvent.title" label="Title" hint="Enter the event title" />

            <Input v-model="editedDescription" label="Description" hint="Optional description" />

            <div class="grid gap-3 md:grid-cols-2">
              <Input
                v-model="editedEvent.date"
                label="Date"
                hint="Format: YYYY-MM-DD"
                type="date"
              />

              <Select v-model="editedEvent.category" :options="categoryOptions" label="Category" />
            </div>

            <Select v-model="editedEvent.status" :options="statusOptions" label="Status" />

            <div v-if="validationError" class="mt-1 text-sm text-red-500">
              {{ validationError }}
            </div>
          </div>
        </div>
      </template>

      <template #actions>
        <div class="flex w-full items-center justify-end gap-2 border-t border-slate-100 pt-3">
          <Button label="Cancel" flat @click="isDialogOpen = false" />
          <Button label="Save" color="primary" @click="saveEvent" />
        </div>
      </template>
    </MoleculeDialog>

    <!-- Delete confirmation dialog -->
    <MoleculeDialog v-model="isDeleteConfirmOpen" class="!max-w-sm">
      <template #content>
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-slate-900">Delete event</h2>
          <p class="text-sm text-slate-500">
            Are you sure you want to delete
            <span class="font-medium text-slate-800"> "{{ eventToDelete?.title }}" </span>
            ? This action cannot be undone.
          </p>
        </div>
      </template>

      <template #actions>
        <div class="flex w-full items-center justify-end gap-2 border-t border-slate-100 pt-3">
          <Button label="Cancel" flat @click="isDeleteConfirmOpen = false" />
          <Button
            label="Delete"
            class="!bg-rose-500 !hover:bg-rose-600 !text-white shadow-sm hover:shadow-md focus:ring-rose-500 border-0"
            color="negative"
            @click="deleteEventConfirmed"
          />
        </div>
      </template>
    </MoleculeDialog>
  </div>
</template>
