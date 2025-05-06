import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { Task } from './types'

interface TaskState {
	tasks: Task[]
	addTask: (boardId: string, listId: string, title: string) => void
	moveTask: (taskId: string, fromListId: string, toListId: string) => void
	editTask: (id: string, newTitle: string) => void
	deleteTask: (id: string) => void
	deleteTasksByBoardId: (boardId: string) => void
	deleteTaskByListId: (listId: string) => void
}

export const useTaskStore = create<TaskState>(set => ({
	tasks: [],
	addTask: (boardId: string, listId: string, title: string) =>
		set(state => ({
			tasks: [...state.tasks, { id: nanoid(8), title, listId, boardId }],
		})),
	moveTask: (taskId: string, fromListId: string, toListId: string) =>
		set(state => ({
			tasks: state.tasks.map(task =>
				task.id === taskId && task.listId === fromListId
					? { ...task, listId: toListId }
					: task
			),
		})),
	editTask: (id: string, newTitle: string) =>
		set(state => ({
			tasks: state.tasks.map(task =>
				task.id === id ? { ...task, title: newTitle } : task
			),
		})),
	deleteTask: (id: string) =>
		set(state => ({
			tasks: state.tasks.filter(task => task.id !== id),
		})),
	deleteTasksByBoardId: (boardId: string) =>
		set(state => ({
			tasks: state.tasks.filter(task => task.boardId !== boardId),
		})),
	deleteTaskByListId: (listId: string) =>
		set(state => ({
			tasks: state.tasks.filter(task => task.listId !== listId),
		})),
}))

export const selectTaskByListId = (listId: string) => (state: TaskState) =>
	state.tasks.filter(task => task.listId === listId)
