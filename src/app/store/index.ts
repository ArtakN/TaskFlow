// @app/store/index.ts
import { create } from 'zustand'

interface Board {
	id: string
	title: string
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
	addBoard: (title: string) => void
	addList: (boardId: string, title: string) => void
	addTask: (boardId: string, listId: string, title: string) => void
}

// Инициализируем стор с моковыми данными
export const useAppStore = create<AppState>(set => ({
	boards: [
		{ id: '1', title: 'Board 1' },
		{ id: '2', title: 'Board 2' },
		{ id: '3', title: 'Board 3' },
	],
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

	// Добавление новой доски
	addBoard: (title: string) =>
		set(state => ({
			boards: [...state.boards, { id: Date.now().toString(), title }],
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
