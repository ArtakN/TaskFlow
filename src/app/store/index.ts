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
	addBoard: (title: string, color: string) => void
	addList: (boardId: string, title: string) => void
	addTask: (boardId: string, listId: string, title: string) => void
}

// Инициализируем стор с моковыми данными
export const useAppStore = create<AppState>(set => ({
	boards: [],
	lists: [
		{ id: '1', title: 'To Do', boardId: '1' },
		{ id: '2', title: 'In Progress', boardId: '1' },
		{ id: '3', title: 'Done', boardId: '1' },
	],
	tasks: [
		{ id: '1', title: 'Task 1', listId: '1', boardId: '1' },
		{ id: '2', title: 'Task 2', listId: '1', boardId: '1' },
		{ id: '3', title: 'Task 3', listId: '1', boardId: '1' },
	],

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
	addBoard: (title: string, color: string) =>
		set(state => ({
			boards: [...state.boards, { id: Date.now().toString(), title, color }],
		})),

	// Добавление нового списка (колонки) в доску
	addList: (boardId: string, title: string) =>
		set(state => ({
			lists: [...state.lists, { id: Date.now().toString(), title, boardId }],
		})),

	// Добавление новой задачи
	addTask: (boardId: string, listId: string, title: string) =>
		set(state => ({
			tasks: [
				...state.tasks,
				{
					id: Date.now().toString(),
					title,
					listId,
					boardId,
				},
			],
		})),
}))
