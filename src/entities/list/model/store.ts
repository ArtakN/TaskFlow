import { nanoid } from 'nanoid'
import { create } from 'zustand'
import type { List } from './types'

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

interface ListState {
	lists: List[]
	isLoadingLists: boolean
	setLists: (lists: List[]) => void
	addList: (boardId: string, title: string) => Promise<void>
	updateListTitle: (listId: string, newTitle: string) => Promise<void>
	deleteList: (listId: string) => Promise<void>
	deleteListsByBoardId: (boardId: string) => Promise<void>
}

export const useListStore = create<ListState>()(set => ({
	lists: [],
	isLoadingLists: false,

	setLists: (lists: List[]) => set({ lists, isLoadingLists: false }),

	addList: async (boardId: string, title: string) => {
		const currentUser = useAuthStore.getState().user
		if (!currentUser?.uid) {
			console.error('User is not authenticated. Cannot add list.')
			return
		}

		set({ isLoadingLists: true })
		const listId = nanoid(8)

		try {
			await setDoc(doc(db, 'lists', listId), {
				title,
				boardId,
				userId: currentUser.uid,
				createdAt: serverTimestamp(),
			})
			console.log(`List ${listId} for board ${boardId} added to Firestore.`)
		} catch (error) {
			console.error('Error adding list to Firestore:', error)
		} finally {
			set({ isLoadingLists: false })
		}
	},

	updateListTitle: async (listId: string, newTitle: string) => {
		set({ isLoadingLists: true })
		try {
			const listRef = doc(db, 'lists', listId)
			await updateDoc(listRef, {
				title: newTitle,
			})
			console.log(`List title ${listId} updated to "${newTitle}" in Firestore.`)
		} catch (error) {
			console.error(`Error updating list ${listId} title:`, error)
		} finally {
			set({ isLoadingLists: false })
		}
	},

	deleteList: async (listId: string) => {
		set({ isLoadingLists: true })
		try {
			const listRef = doc(db, 'lists', listId)
			await deleteDoc(listRef)
			console.log(`List ${listId} deleted from Firestore.`)
		} catch (error) {
			console.error(`Error deleting list ${listId}:`, error)
		} finally {
			set({ isLoadingLists: false })
		}
	},

	deleteListsByBoardId: async (boardId: string) => {
		set({ isLoadingLists: true })
		console.log(`Attempting to delete lists for board ID: ${boardId}`)
		try {
			const q = query(collection(db, 'lists'), where('boardId', '==', boardId))
			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				console.log(`No lists found for board ID: ${boardId} to delete.`)
				set({ isLoadingLists: false })
				return
			}

			const batch = writeBatch(db)
			querySnapshot.forEach(documentSnapshot => {
				console.log(`Adding list ${documentSnapshot.id} to delete batch.`)
				batch.delete(documentSnapshot.ref)
			})

			await batch.commit()
			console.log(`Lists for board ID: ${boardId} deleted from Firestore.`)
		} catch (error) {
			console.error(`Error deleting lists for board ID ${boardId}:`, error)
		} finally {
			set({ isLoadingLists: false })
		}
	},
}))

export const selectListsByBoardId = (boardId: string) => (state: ListState) =>
	state.lists.filter(list => list.boardId === boardId)
