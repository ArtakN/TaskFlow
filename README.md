# Task Flow

**Task Flow** is a Kanban-style task management web application designed to help users organize and visualize their tasks effectively across multiple boards. Built as a portfolio project, it demonstrates proficiency in modern front-end technologies and architectural patterns like Feature-Sliced Design (FSD).

## 🌐 Live Demo

Explore the live demo: [Task Flow Demo](https://task-flow-6c09a.web.app/)
_(Note: The demo reflects the latest deployed version with localStorage persistence.)_

## 💻 Portfolio

Visit my portfolio website: [artaknavoyan.de](https://artaknavoyan.de)

## 🛠️ Tech Stack

- **React (v19)** & **TypeScript**: For a robust, type-safe, component-based UI.
- **Vite**: Modern build tool providing a fast development experience.
- **Zustand**: Lightweight state management with entity-specific stores and optimized selectors (using `useShallow`). Includes `persist` middleware for `localStorage`.
- **Tailwind CSS (v4)**: Utility-first CSS framework for rapid UI development.
- **React Router**: Client-side routing.
- **FSD (Feature-Sliced Design)**: Architectural methodology ensuring high modularity, scalability, and maintainability through clear layer and slice boundaries (`app`, `pages`, `widgets`, `features`, `entities`, `shared`) and Public Slice APIs (`index.ts`).
- **Lucide React**: Icon library for clean and consistent icons.
- **Shadcn UI / Radix UI**: For accessible, unstyled UI primitives like Dropdown Menus, which are then styled with Tailwind CSS.
- **Firebase**: Hosting (current), Authentication & Firestore (planned).
- **Other Tools**: ESLint, Prettier, NanoID, clsx, tailwind-merge.

## ✨ Implemented Functionality

- **Core Architecture (FSD & Zustand):**
  - Project meticulously structured according to Feature-Sliced Design principles (layers, slices, public APIs).
  - State managed by Zustand using separate, optimized entity stores (`Board`, `List`, `Task`).
- **Board CRUD & Features:**
  - Create new boards (with default "To Do", "In Progress", "Done" lists).
  - View a list of all boards on the Home Page.
  - Edit board titles inline with an auto-resizing textarea.
  - Delete boards with user confirmation, including cascading deletion of all associated lists and tasks.
- **List CRUD & Features:**
  - View lists dynamically on a selected board page.
  - Add new lists to a board.
  - Edit list titles inline with an auto-resizing textarea.
  - Delete lists with user confirmation, including cascading deletion of all associated tasks.
- **Task CRUD & Features:**
  - Add new task cards to lists.
  - Edit task text inline with an auto-resizing textarea.
  - Delete tasks with user confirmation.
- **User Experience:**
  - Intuitive Drag & Drop functionality for moving task cards between lists.
  - Context menus (three-dots) for board and list actions, built using Shadcn UI/Radix UI.
- **Local Persistence:**
  - All board, list, and task data is saved to the browser's `localStorage` and restored on page reload, ensuring no data loss between sessions (implemented via Zustand `persist` middleware).
- **Deployment:**
  - Application deployed and accessible via Firebase Hosting.

## 🚀 Getting Started (Local Development)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ArtakN/TaskFlow.git](https://github.com/ArtakN/TaskFlow.git)
    # Ensure you have the correct repository URL
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd TaskFlow
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or: yarn install
    ```
4.  **(Optional) Setup Environment Variables:** If Firebase keys (or other sensitive keys) are managed via `.env.local` (which is good practice and gitignored), create this file in the root and add your variables:
    ```env
    VITE_FIREBASE_API_KEY=your_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    # ... and other Firebase config variables
    ```
5.  **Run the development server:**
    ```bash
    npm run dev
    # or: yarn dev
    ```
6.  Open [http://localhost:5173](http://localhost:5173) (or the port specified in the console) in your browser.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode with hot-reloading.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the code using ESLint.
- `npm run lint:fix`: Attempts to automatically fix linting issues.
- `npm run preview`: Serves the production build locally for preview.

## 🎯 Planned Features (Next Steps)

- Implement unit/integration tests (Vitest + React Testing Library).
- Implement Firebase Authentication (user login/registration).
- Integrate Firestore for persistent, real-time data storage (replacing `localStorage`).
- UI/UX Polish (loading states, comprehensive error handling, advanced styling, empty states).
- Explore further optimizations and advanced features (e.g., task descriptions, due dates, labels, search/filter).

## 📬 Contact

If you have any questions or suggestions, feel free to reach out:

- **Email**: [navoyan.ab@gmail.com](mailto:navoyan.ab@gmail.com)
- **LinkedIn**: [linkedin.com/in/artak-navoyan-7564a4149/](https://www.linkedin.com/in/artak-navoyan-7564a4149/)
- **GitHub**: [github.com/ArtakN](https://github.com/ArtakN)
