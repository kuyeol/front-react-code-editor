
# Docker Cloud Editor

A high-performance cloud-based IDE for Docker container development, featuring a full-featured code editor, real-time terminal, and live preview window.

## 📂 Project Folder Structure

The project follows a logical structure separating layout, views, UI components, and business logic.

```plaintext
root/
├── 📄 index.html                # App entry point (Tailwind, Fonts, PrismJS)
├── 📄 index.tsx                 # React entry point
├── 📄 App.tsx                   # Main State Container & Layout Composition
├── 📄 types.ts                  # Global Type Definitions
├── 📄 metadata.json             # App Metadata
│
├── 📁 components/               # React Components
│   ├── 📁 layout/               # [Layout] Structural components
│   │   ├── 📄 TopNavbar.tsx     # Top menu bar
│   │   ├── 📄 StatusBar.tsx     # Bottom status bar
│   │   ├── 📄 Sidebar.tsx       # Sidebar container
│   │   ├── 📄 ActivityBar.tsx   # Leftmost icon menu
│   │   │
│   │   └── 📁 activity-bar/     # ActivityBar specific components
│   │       ├── 📄 ActivityBarMenuItems.tsx
│   │       ├── 📄 ActivityBarItem.tsx
│   │       ├── 📄 AccountItem.tsx
│   │       └── 📁 items/        # Individual menu items
│   │           ├── 📄 ExplorerItem.tsx
│   │           ├── 📄 SearchItem.tsx
│   │           ├── 📄 SourceControlItem.tsx
│   │           ├── 📄 ExtensionsItem.tsx
│   │           └── 📄 TerminalItem.tsx
│   │
│   ├── 📁 views/                # [Views] Functional screens
│   │   ├── 📁 editor/           # Code Editor logic
│   │   │   └── 📄 Editor.tsx
│   │   │
│   │   ├── 📁 terminal/         # Terminal logic
│   │   │   └── 📄 Terminal.tsx
│   │   │
│   │   ├── 📁 preview/          # Live Preview logic
│   │   │   └── 📄 Preview.tsx
│   │   │
│   │   └── 📁 sidebar/          # Sidebar specific views
│   │       ├── 📁 explorer/     # File Explorer
│   │       │   ├── 📄 ExplorerView.tsx
│   │       │   └── 📄 FileTreeItem.tsx
│   │       ├── 📁 search/       # Search View
│   │       │   └── 📄 SearchView.tsx
│   │       ├── 📁 git/          # Source Control View
│   │       │   └── 📄 GitView.tsx
│   │       └── 📁 extensions/   # Extensions View
│   │           └── 📄 ExtensionsView.tsx
│   │
│   └── 📁 ui/                   # [UI] Reusable UI components
│       └── 📄 Toast.tsx         # Notification Toast
│
├── 📁 hooks/                    # Custom Hooks
│   └── 📄 useLayoutResize.ts    # Layout resizing logic
│
└── 📁 services/                 # Data Services (Mock API)
    ├── 📄 fileService.ts
    └── 📄 mockFiles.ts
```

## 🔗 Dependencies & Architecture

### 1. External Libraries
Loaded via `index.html` (CDN/Importmap):
*   **Core:** `react`, `react-dom`
*   **Styling:** `tailwindcss`, `Google Fonts` (Inter, Fira Code, Material Symbols)
*   **Editor Logic:** `react-simple-code-editor`, `prismjs`

### 2. Component Hierarchy

*   **Root (`App.tsx`)**: Manages global state (files, layout visibility, active view) and composes the main layout elements.
*   **Layout Group (`components/layout/`)**: Defines the skeleton of the application.
    *   `Sidebar` switches between views based on `App` state.
    *   `ActivityBar` manages the primary navigation.
*   **Views Group (`components/views/`)**: Contains the specific logic for each feature area (Editor, Terminal, Explorer).
*   **Logic Hooks (`hooks/`)**: Separates complex logic (like drag-and-drop resizing) from the view components.
