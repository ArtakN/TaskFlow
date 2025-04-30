export function AboutPage() {
	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-4'>About Task Flow</h1>

			<p className='mb-4'>
				<strong>Task Flow</strong> is a Kanban-style task management web
				application that helps users organize and manage their tasks across
				multiple boards. It is part of my portfolio, showcasing my experience
				with modern web technologies. The application allows users to create
				boards, add lists, and manage tasks with drag-and-drop functionality,
				providing a simple and intuitive interface for efficient workflow
				management.
			</p>

			<p className='my-6 text-lg'>
				Check out my full portfolio at{' '}
				<a
					href='https://artaknavoyan.de'
					target='_blank'
					rel='noopener noreferrer'
					className='text-[#4D95FF] hover:underline'
				>
					artaknavoyan.de
				</a>
			</p>

			<h2 className='text-xl sm:text-2xl font-semibold mb-2'>
				Technologies Used
			</h2>
			<ul className='list-disc pl-6 mb-4'>
				<li>
					<strong>React</strong> – For building the dynamic, component-based
					user interface.
				</li>
				<li>
					<strong>TypeScript</strong> – Ensures type safety and better code
					reliability.
				</li>
				<li>
					<strong>Tailwind CSS</strong> – To create a modern and responsive
					design.
				</li>
				<li>
					<strong>Firebase</strong> – For hosting and real-time data
					synchronization.
					<ul className=' pl-6'>
						<li>
							<strong>Hosting</strong>: Deploys and hosts the app with fast,
							secure delivery.
						</li>
						<li>
							<strong>Firestore</strong>: Enables real-time data synchronization
							and persistent storage (coming soon).
						</li>
						<li>
							<strong>Authentication</strong>: For user login and registration
							(coming soon).
						</li>
					</ul>
				</li>
				<li>
					<strong>Zustand</strong> – A simple state management library for
					handling app state.
				</li>
				<li>
					<strong>FSD (Feature-Sliced Design)</strong> – Organizes the project
					architecture into clear and manageable slices for scalability and
					maintainability.
				</li>
			</ul>

			<h2 className='text-2xl font-semibold mb-2'>What’s Done (Sprint 1)</h2>
			<ul className='list-disc pl-6 mb-4'>
				<li>
					Set up <strong>FSD architecture</strong> with the structure (@app,
					@widgets, @features, @entities, @shared).
				</li>
				<li>
					Created the <strong>Home page</strong> with a list of boards and
					functionality to <strong>create new boards</strong>.
				</li>
				<li>
					Implemented the <strong>Board page</strong> (/board/:id route) with
					dynamic rendering and automatic creation of{' '}
					<strong>3 default lists</strong>: To Do, In Progress, and Done.
				</li>
				<li>
					Allowed users to <strong>add new lists</strong> within a board.
				</li>
				<li>
					Enabled functionality to <strong>add cards</strong> to lists.
				</li>
				<li>
					Implemented <strong>drag-and-drop</strong> functionality to move task
					cards between lists.
				</li>
				<li>
					Implemented <strong>Zustand</strong> state management for boards,
					lists, and tasks.
				</li>
				<li>
					Deployed the application using <strong>Firebase Hosting</strong>.
				</li>
			</ul>

			<h2 className='text-2xl font-semibold mb-2'>
				What’s Coming Next (Sprint 2)
			</h2>
			<ul className='list-disc pl-6 mb-4'>
				<li> Edit board name (input on click of the name)</li>
				<li> Edit column names (change name + delete)</li>
				<li>
					Edit card title and description (change name, description, delete)
				</li>
				<li>
					Implement saving data to <strong>localStorage</strong> to ensure data
					persists on page reload
				</li>
				<li> Add tests to ensure stability</li>

				<li>
					Implement Firebase Authentication for user login and registration
				</li>
				<li>
					Integrate <strong>Firestore</strong> for real-time data storage and
					syncing, ensuring persistent task and board data
				</li>
			</ul>
		</div>
	)
}
