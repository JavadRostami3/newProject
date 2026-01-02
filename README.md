# Moallem Yar (Teacher Assistant) Dashboard

An RTL Persian-language teacher dashboard built with Vite + React and styled with Tailwind CSS. It includes the main dashboard, student management, performance reports, content/test generation, calendar, AI assistant, and image-generation placeholder pages.

## Key Features
- Dashboard overview with stat cards, recent activities, and upcoming events.
- Student management: search, status/grade filters, sorting, pagination, sample add/edit/delete, and mock transcript view.
- Performance reports with Recharts charts and top-student list.
- Content/Test generation with validation, question distribution helpers, and sample recent items.
- Calendar, assistant, and image pages scaffolded as placeholders for future integrations.
- Responsive design with desktop sidebar + mobile nav, RTL layout, and Jalali date support via dayjs + jalaliday.

## Tech Stack
- React 18 + Vite
- React Router DOM
- Tailwind CSS
- Recharts
- dayjs + jalaliday (Jalali calendar)
- Lucide React (icons)

## Prerequisites
- Node.js 18 or newer
- npm (installed with Node) or a compatible package manager

## Quick Start
```bash
npm install
npm run dev
```
After running `npm run dev`, the exact dev server URL is printed in the terminal (e.g., `http://localhost:5173` or another open port).

## Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build

## Folder Structure
```
├─ public/
├─ src/
│  ├─ App.jsx          # Layout and navigation
│  ├─ main.jsx         # React + React Router bootstrap
│  ├─ index.css        # Base styles and Tailwind
│  └─ pages/           # Dashboard, Students, Reports, Content, Calendar, Assistant, Image
├─ index.html          # Vite entry (lang=fa-IR, dir=rtl)
└─ package.json
```

## Status
In progress. Current data is mock/sample and ready to be wired to real APIs.
