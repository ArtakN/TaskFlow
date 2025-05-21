import { db } from '@/app/firebase/config'
import { useAuthStore } from '@/entities/user'
import {
	deleteDoc,
	doc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { create } from 'zustand'
import type { Board, Color } from './types'

interface BoardState {
	boards: Board[]
	colors: Color[]
	isLoadingBoards: boolean
	setBoards: (boards: Board[]) => void
	setLoadingBoards: (isLoading: boolean) => void
	addBoard: (id: string, title: string, color: string) => Promise<void>
	updateBoardTitle: (id: string, newTitle: string) => Promise<void>
	deleteBoard: (id: string) => Promise<void>
}

export const useBoardStore = create<BoardState>()(set => ({
	boards: [],
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
	isLoadingBoards: true,

	setBoards: boards => set({ boards }),
	setLoadingBoards: isLoading => set({ isLoadingBoards: isLoading }),

	addBoard: async (id: string, title: string, color: string) => {
		const currentUser = useAuthStore.getState().user
		if (!currentUser?.uid) {
			console.error('User is not authenticated. Cannot add board.')
			return
		}
		set({ isLoadingBoards: true })
		try {
			await setDoc(doc(db, 'boards', id), {
				title,
				color,
				userId: currentUser.uid,
				createdAt: serverTimestamp(),
			})
		} catch (error) {
			console.error('Ошибка при добавлении доски в Firestore:', error)
		} finally {
			set({ isLoadingBoards: false })
		}
	},

	updateBoardTitle: async (id: string, newTitle: string) => {
		set({ isLoadingBoards: true })
		try {
			const boardRef = doc(db, 'boards', id)
			await updateDoc(boardRef, {
				title: newTitle,
			})

			set(state => ({
				boards: state.boards.map(board =>
					board.id === id ? { ...board, title: newTitle } : board
				),
			}))

			console.log(
				`Название доски ${id} обновлено на "${newTitle}" в Firestore.`
			)
		} catch (error) {
			console.error(`Ошибка при обновлении названия доски ${id}:`, error)
		} finally {
			set({ isLoadingBoards: false })
		}
	},

	deleteBoard: async (id: string) => {
		set({ isLoadingBoards: true })
		try {
			const boardRef = doc(db, 'boards', id)
			await deleteDoc(boardRef)
			console.log(`Доска ${id} удалена из Firestore.`)
		} catch (error) {
			console.error(`Ошибка при удалении доски ${id}:`, error)
		} finally {
			set({ isLoadingBoards: false })
		}
	},
}))
