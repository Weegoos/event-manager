<div align="center">

# NTS Events Manager

<div align="center">

![Dashboard Preview](src\docs\dashboard.png)

</div>

<br>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?logo=github">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg">
  <img alt="Quasar" src="https://img.shields.io/badge/Quasar-2.x-orange.svg?logo=quasar">
  <img alt="Vue" src="https://img.shields.io/badge/Vue-3.x-brightgreen.svg?logo=vue.js">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript">
</p>

</div>

## 🚀 Описание

**Современный дашборд для управления событиями** на **Quasar + Vue 3 + TypeScript + Tailwind CSS**.

**Полностью responsive** CRUD с фильтрацией, поиском, валидацией и локальным хранением данных.

<div align="center">

</div>

## ✨ Основные возможности

<div align="center">

| ✅ **CRUD**          | ✅ **Фильтры**         | ✅ **Валидация** | ✅ **Responsive** |
| -------------------- | ---------------------- | ---------------- | ----------------- |
| Create/Update/Delete | Category/Status/Search | Title/Date       | 📱💻📱            |
| **Atomic Design**    | **localStorage**       | **TypeScript**   | **Tailwind CSS**  |

</div>

## 🏗️ Архитектура (Atomic Design)

```mermaid
graph TD
    A[atoms<br/>Button Input Select] --> B[molecules<br/>Table Dialog]
    B --> C[Pages<br/>IndexPage.vue]
    D[services<br/>eventsStorage.ts] --> C
    E[composables<br/>formatDate] --> C
    F[models<br/>EventItem EventCategory] --> D
    G[boot<br/>initEvents] --> D
```
