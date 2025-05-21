import { db } from '@/app/firebase/config'
import { useAuthStore } from '@/entities/user'
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
	writeBatch,
} from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { create } from 'zustand'
import type { Task } from './types'

interface TaskState {
	tasks: Task[]
	isLoadingTasks: boolean
	setTasks: (tasks: Task[], listIdToUpdate?: string) => void
	addTask: (
		boardId: string,
		listId: string,
		text: string
	) => Promise<string | undefined>
	moveTask: (
		taskId: string,
		fromListId: string,
		toListId: string
	) => Promise<void>
	editTask: (
		taskId: string,
		newText: string,
		newDescription?: string
	) => Promise<void>
	deleteTask: (taskId: string) => Promise<void>
	deleteTasksByBoardId: (boardId: string) => Promise<void>
	deleteTaskByListId: (listId: string) => Promise<void>
}

export const useTaskStore = create<TaskState>()(set => ({
	tasks: [],
	isLoadingTasks: false,

	setTasks: (newTasks: Task[], listIdToUpdate?: string) => {
		set(state => {
			if (listIdToUpdate) {
				const otherTasks = state.tasks.filter(
					task => task.listId !== listIdToUpdate
				)
				return { tasks: [...otherTasks, ...newTasks], isLoadingTasks: false }
			}
			return { tasks: newTasks, isLoadingTasks: false }
		})
	},

	addTask: async (boardId: string, listId: string, text: string) => {
		const currentUser = useAuthStore.getState().user
		if (!currentUser?.uid) {
			console.error('User not authenticated. Cannot add task.')
			return undefined
		}

		set({ isLoadingTasks: true })
		const taskId = nanoid(8)
		const taskData = {
			text,
			listId,
			boardId,
			userId: currentUser.uid,
			createdAt: serverTimestamp(),
		}

		try {
			await setDoc(doc(db, 'tasks', taskId), taskData)
			console.log(`Task ${taskId} added to Firestore.`)
			return taskId
		} catch (error) {
			console.error('Error adding task to Firestore:', error)
			return undefined
		} finally {
			set({ isLoadingTasks: false })
		}
	},

	editTask: async (
		taskId: string,
		newText: string,
		newDescription?: string
	) => {
		set({ isLoadingTasks: true })
		try {
			const taskRef = doc(db, 'tasks', taskId)
			const updates: { text: string; description?: string } = { text: newText }
			if (newDescription !== undefined) {
				updates.description = newDescription
			}
			await updateDoc(taskRef, updates)
			console.log(`Task ${taskId} updated in Firestore.`)
		} catch (error) {
			console.error(`Error updating task ${taskId}:`, error)
		} finally {
			set({ isLoadingTasks: false })
		}
	},

	deleteTask: async (taskId: string) => {
		set({ isLoadingTasks: true })
		try {
			const taskRef = doc(db, 'tasks', taskId)
			await deleteDoc(taskRef)
			console.log(`Task ${taskId} deleted from Firestore.`)
		} catch (error) {
			console.error(`Error deleting task ${taskId}:`, error)
		} finally {
			set({ isLoadingTasks: false })
		}
	},

	moveTask: async (taskId: string, fromListId: string, toListId: string) => {
		if (fromListId === toListId) return

		set({ isLoadingTasks: true })
		try {
			const taskRef = doc(db, 'tasks', taskId)
			await updateDoc(taskRef, {
				listId: toListId,
			})
			console.log(
				`Task ${taskId} moved from list ${fromListId} to ${toListId} in Firestore.`
			)
		} catch (error) {
			console.error(`Error moving task ${taskId}:`, error)
		} finally {
			set({ isLoadingTasks: false })
		}
	},

	deleteTaskByListId: async (listId: string) => {
		set({ isLoadingTasks: true })
		console.log(`Attempting to delete tasks for list ID: ${listId}`)
		try {
			const q = query(collection(db, 'tasks'), where('listId', '==', listId))
			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				console.log(`No tasks found for list ID: ${listId} to delete.`)
				set({ isLoadingTasks: false })
				return
			}

			const batch = writeBatch(db)
			querySnapshot.forEach(documentSnapshot => {
				batch.delete(documentSnapshot.ref)
			})
			await batch.commit()
			console.log(`Tasks for list ID: ${listId} deleted from Firestore.`)
		} catch (error) {
			console.error(`Error deleting tasks for list ID ${listId}:`, error)
		} finally {
			set({ isLoadingTasks: false })
		}
	},

	deleteTasksByBoardId: async (boardId: string) => {
		set({ isLoadingTasks: true })
		console.log(`Attempting to delete tasks for board ID: ${boardId}`)
		try {
			const q = query(collection(db, 'tasks'), where('boardId', '==', boardId))
			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				console.log(`No tasks found for board ID: ${boardId} to delete.`)
				set({ isLoadingTasks: false })
				return
			}

			const batch = writeBatch(db)
			querySnapshot.forEach(documentSnapshot => {
				batch.delete(documentSnapshot.ref)
			})
			await batch.commit()
			console.log(`Tasks for board ID: ${boardId} deleted from Firestore.`)
		} catch (error) {
			console.error(`Error deleting tasks for board ID ${boardId}:`, error)
		} finally {
			set({ isLoadingTasks: false })
		}
	},
}))

export const selectTaskByListId = (listId: string) => (state: TaskState) =>
	state.tasks.filter(task => task.listId === listId)
