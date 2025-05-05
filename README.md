# Task Flow

**Task Flow** is a Kanban-style task management web application designed to help users organize and visualize their tasks effectively across multiple boards. Built as a portfolio project, it demonstrates proficiency in modern front-end technologies and architectural patterns like Feature-Sliced Design (FSD).

## 🌐 Live Demo

Explore the live demo: [Task Flow Demo](https://task-flow-6c09a.web.app/)
_(Note: The demo might reflect an earlier version of the project)._

## 💻 Portfolio

Visit my portfolio website: [artaknavoyan.de](https://artaknavoyan.de)

## 🛠️ Tech Stack

- **React (v19)** & **TypeScript**: For a robust, type-safe, component-based UI.
- **Vite**: Modern build tool providing a fast development experience.
- **Zustand**: Lightweight state management with entity-specific stores and optimized selectors (`useShallow`).
- **Tailwind CSS (v4)**: Utility-first CSS framework for rapid UI development.
- **React Router**: Client-side routing.
- **FSD (Feature-Sliced Design)**: Architectural methodology ensuring high modularity, scalability, and maintainability through clear layer and slice boundaries (`app`, `pages`, `widgets`, `features`, `entities`, `shared`) and Public Slice APIs (`index.ts`).
- **Lucide React**: Icon library.
- **Firebase**: Hosting (current), Authentication & Firestore (planned).
- **(Other tools):** ESLint, Prettier, NanoID.

## ✨ Implemented Functionality

- **FSD Architecture:** Project structured according to Feature-Sliced Design principles, including layer separation, slice Public APIs (`index.ts`), and entity-based state management.
- **State Management:** Zustand implemented with separate stores per entity (`Board`, `List`, `Task`). Selectors optimized using `useShallow` to prevent unnecessary re-renders.
- **Board Management:**
  - View list of boards (Home Page).
  - Create new boards.
  - Edit board titles inline (with auto-resizing textarea).
  - Delete boards (includes confirmation and cascading deletion of associated lists and tasks).
- **List Management:**
  - View lists on a board (Board Page).
  - Edit list titles inline (with auto-resizing textarea).
  - Add new lists.
  - Default lists ("To Do", "In Progress", "Done") created automatically for new boards.
- **Task Management:**
  - Add new task cards to lists.
- **Drag & Drop:** Move task cards between lists within a board.
- **Deployment:** Application deployed via Firebase Hosting.

## 🚀 Getting Started (Local Development)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ArtakN/taskflow.git](https://github.com/ArtakN/taskflow.git)
    # Replace with your actual repository URL if different
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd taskflow
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or: yarn install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    # or: yarn dev
    ```
5.  Open [http://localhost:5173](http://localhost:5173) (or the port specified in the console) in your browser.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the code using ESLint.
- `npm run lint:fix`: Attempts to automatically fix linting issues.
- `npm run preview`: Serves the production build locally for preview.

## 🎯 Planned Features (Next Steps)

- Delete lists (with cascading task deletion).
- Edit task details (title, description).
- Delete tasks.
- Implement `localStorage` persistence (as an interim step).
- Implement unit/integration tests (Vitest + React Testing Library).
- Implement Firebase Authentication.
- Integrate Firestore for persistent, real-time data storage (replacing localStorage).
- UI/UX Polish (loading states, error handling, improved dropdowns/modals, further styling).
- Explore further optimizations (e.g., `reselect` if needed, shared UI improvements, consider Shadcn UI).

## 📬 Contact

If you have any questions or suggestions, feel free to reach out:

- **Email**: [navoyan.ab@gmail.com](mailto:navoyan.ab@gmail.com)
- **LinkedIn**: [linkedin.com/in/artak-navoyan-7564a4149/](https://www.linkedin.com/in/artak-navoyan-7564a4149/)
- **GitHub**: [github.com/ArtakN](https://github.com/ArtakN)
