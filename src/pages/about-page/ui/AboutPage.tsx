export function AboutPage() {
	return (
		<div className='container mx-auto p-4 max-w-4xl'>
			<h1 className='text-3xl font-bold mb-6 text-center'>About Task Flow</h1>

			<p className='mb-4 text-lg leading-relaxed'>
				<strong>Task Flow</strong> is a Kanban-style task management web
				application designed to help users organize and visualize their tasks
				effectively across multiple boards. Built as a portfolio project, it
				demonstrates proficiency in modern front-end technologies and
				architectural patterns. The application features board creation, list
				management within boards, card creation, and intuitive drag-and-drop
				functionality for workflow management.
			</p>

			<p className='my-8 text-lg text-center'>
				Check out my full portfolio at{' '}
				<a
					href='https://artaknavoyan.de'
					target='_blank'
					rel='noopener noreferrer'
					className='text-[#4D95FF] hover:underline font-medium'
				>
					artaknavoyan.de
				</a>
			</p>

			<h2 className='text-2xl font-semibold mb-3 border-b pb-2'>
				Technologies Used
			</h2>
			<ul className='list-disc space-y-2 pl-6 mb-6'>
				<li>
					<strong>React (v19) & TypeScript</strong>: For a robust, type-safe,
					component-based UI.
				</li>
				<li>
					<strong>Vite</strong>: Modern and fast build tooling.
				</li>
				<li>
					<strong>Tailwind CSS (v4)</strong>: Utility-first CSS framework for
					rapid and responsive UI development.
				</li>
				<li>
					<strong>Zustand</strong>: Lightweight and scalable state management
					with separation into entity-specific stores.
				</li>
				<li>
					<strong>Feature-Sliced Design (FSD)</strong>: Architectural
					methodology ensuring high modularity, scalability, and maintainability
					through clear layer and slice boundaries (`app`, `pages`, `widgets`,
					`features`, `entities`, `shared`) and Public Slice APIs (`index.ts`).
				</li>
				<li>
					<strong>React Router</strong>: For client-side routing.
				</li>
				<li>
					<strong>Lucide Icons</strong>: For clean and consistent icons.
				</li>
				<li>
					<strong>Shadcn UI / Radix UI</strong>: For accessible, unstyled UI
					primitives (like DropdownMenu).
				</li>
				<li>
					<strong>Firebase (Current & Planned)</strong>:
					<ul className='list-circle space-y-1 pl-6 mt-1'>
						<li>
							<strong>Hosting</strong>: Current deployment platform.
						</li>
						<li>
							<strong>Firestore</strong>: Planned for real-time database
							persistence.
						</li>
						<li>
							<strong>Authentication</strong>: Planned for user management.
						</li>
					</ul>
				</li>
				<li>
					**Other Tools**: ESLint, Prettier, NanoID, clsx, tailwind-merge.
				</li>
			</ul>

			<h2 className='text-2xl font-semibold mb-3 border-b pb-2'>
				Implemented Functionality
			</h2>
			<ul className='list-disc space-y-2 pl-6 mb-6'>
				<li>
					**FSD Architecture:** Project structured according to Feature-Sliced
					Design principles, including layer separation, slice Public APIs
					(`index.ts`), and entity-based state management.
				</li>
				<li>
					**State Management:** Zustand implemented with separate stores for
					`Board`, `List`, and `Task` entities. Selectors optimized using
					`useShallow` (or potentially `reselect`).
				</li>
				<li>
					**Board Management:** Create boards, view list of boards (Home Page).
				</li>
				<li>
					**Board Editing:** Edit board titles inline (with auto-resizing
					textarea).
				</li>
				<li>
					**Board Deletion:** Delete boards (includes confirmation and cascading
					deletion of associated lists and tasks).
				</li>
				<li>
					**List Management:** View lists on a board (Board Page), default lists
					created automatically, add new lists. Edit list titles inline (with
					auto-resizing textarea).
				</li>
				<li>
					**List Deletion:** Delete lists (includes confirmation and cascading
					deletion of associated tasks).
				</li>
				<li>
					**Task Management:** Add new task cards to lists, edit task text
					(inline, using auto-resizing textarea), delete tasks.
				</li>
				<li>**Drag & Drop:** Move task cards between lists within a board.</li>
				<li>
					**Local Persistence:** All boards, lists, and tasks are saved to
					`localStorage` and restored on page reload using Zustand's `persist`
					middleware.
				</li>
				<li>
					**UI Components:** Utilizes Shadcn UI / Radix UI primitives for
					components like Dropdown Menus.
				</li>
				<li>**Deployment:** Application deployed via Firebase Hosting.</li>
			</ul>

			<h2 className='text-2xl font-semibold mb-3 border-b pb-2'>
				Planned Features (Next Steps)
			</h2>
			<ul className='list-disc space-y-2 pl-6 mb-4'>
				<li>
					Implement unit/integration tests (Vitest + React Testing Library).
				</li>
				<li>Implement Firebase Authentication.</li>
				<li>
					Integrate Firestore for persistent, real-time data storage (replacing
					localStorage).
				</li>
				<li>UI/UX Polish (loading states, error handling, further styling).</li>
				<li>Explore further optimizations (shared UI improvements).</li>
			</ul>
		</div>
	)
}
