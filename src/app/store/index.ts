import { nanoid } from 'nanoid'
// @app/store/index.ts
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
}

// Инициализируем стор с моковыми данными
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

	// Добавление нового списка в доску
	addList: (boardId: string, title: string) =>
		set(state => ({
			lists: [...state.lists, { id: nanoid(8), title, boardId }],
		})),

	// Добавление новой задачи
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
}))
