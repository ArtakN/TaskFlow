import { nanoid } from 'nanoid'
import { create } from 'zustand'

interface Colors {
	id: string
	title: string
}

interface Board {
	id: string
	title: string
	color: string
}

interface List {
	id: string
	title: string
	boardId: string
}

interface Task {
	id: string
	title: string
	listId: string
	boardId: string
}

interface AppState {
	boards: Board[]
	lists: List[]
	tasks: Task[]
	colors: Colors[]
	addBoard: (id: string, title: string, color: string) => void
	addList: (boardId: string, title: string) => void
	addTask: (boardId: string, listId: string, title: string) => void
	moveTask: (taskId: string, fromListId: string, toListId: string) => void
}

// Store initialization
export const useAppStore = create<AppState>(set => ({
	boards: [],
	lists: [],
	tasks: [],
	colors: [
		{ id: '1', title: 'brown' },
		{ id: '2', title: 'green' },
		{ id: '3', title: 'blue' },
		{ id: '4', title: 'yellow' },
		{ id: '5', title: 'purple' },
		{ id: '6', title: 'orange' },
		{ id: '7', title: 'pink' },
		{ id: '8', title: 'gray' },
		{ id: '10', title: 'teal' },
	],

	// Add board
	addBoard: (id: string, title: string, color: string) =>
		set(state => ({
			boards: [...state.boards, { id, title, color }],
		})),

	// Add list
	addList: (boardId: string, title: string) =>
		set(state => ({
			lists: [...state.lists, { id: nanoid(8), title, boardId }],
		})),

	// Add task
	addTask: (boardId: string, listId: string, title: string) =>
		set(state => ({
			tasks: [
				...state.tasks,
				{
					id: nanoid(8),
					title,
					listId,
					boardId,
				},
			],
		})),

	// Move task from one list to another
	moveTask: (taskId: string, fromListId: string, toListId: string) =>
		set(state => ({
			tasks: state.tasks.map(
				task =>
					// Find the task that matches the given taskId and is currently in fromListId
					task.id === taskId && task.listId === fromListId
						? {
								...task, // Keep all other properties of the task unchanged
								listId: toListId, // Update only the listId to move the task
						  }
						: task // If the task doesn't match, return it unchanged
			),
		})),
}))
