# NTS Events Manager

🚀 **Modern Event Management Dashboard** на **Quasar + Vue 3 + TypeScript + Tailwind CSS**. Полностью responsive CRUD с фильтрацией и поиском.

![Screenshot](docs/screenshot.png)

## ✨ Демо & Фичи

| Платформа        | Ссылка                                                       | Особенности                 |
| ---------------- | ------------------------------------------------------------ | --------------------------- |
| **Live Demo**    | [Event manager](https://event-manager-quasar.netlify.app/#/) | Полный функционал           |
| **localStorage** | ✅                                                           | Данные сохраняются локально |
| **Responsive**   | 📱💻                                                         | Mobile/Tablet/Desktop       |

✅ **CRUD операций**  
✅ **Фильтры** (Category/Status/Search)  
✅ **Валидация** форм  
✅ **Delete Confirm** диалог  
✅ **Atomic Design** архитектура

## 🏗️ Архитектура (Atomic Design)

```txt
src/
├── atoms/          # Button, Input, Select
├── molecules/      # Table, MoleculeDialog
├── services/       # eventsStorage.ts (CRUD API)
├── composables/    # formatDate
├── models/         # EventItem, EventCategory
└── boot/           # initEvents
```

# Клонировать и установить

git clone [repo](https://github.com/Weegoos/event-manager.git)
cd nts
yarn

# Dev сервер (hot reload)

quasar dev

# Проверка качества

yarn lint
yarn type-check
yarn format

# Production билд

quasar build

# Превью билда

quasar build --debug info
