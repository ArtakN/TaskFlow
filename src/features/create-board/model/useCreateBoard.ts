import { db } from '@/app/firebase/config'
import { useAuthStore } from '@/entities/user'
import { nanoid } from 'nanoid'
import { doc, serverTimestamp, writeBatch } from 'firebase/firestore'

const DEFAULT_LIST_TITLES = ['To Do', 'In Progress', 'Done']

export function useCreateBoard() {
	const createBoard = async (title: string, bgColor: string) => {
		const currentUser = useAuthStore.getState().user
		if (!currentUser?.uid) {
			throw new Error('User is not authenticated.')
		}

		const boardId = nanoid(8)
		const batch = writeBatch(db)

		batch.set(doc(db, 'boards', boardId), {
			title,
			color: bgColor,
			userId: currentUser.uid,
			createdAt: serverTimestamp(),
		})

		DEFAULT_LIST_TITLES.forEach(listTitle => {
			batch.set(doc(db, 'lists', nanoid(8)), {
				title: listTitle,
				boardId,
				userId: currentUser.uid,
				createdAt: serverTimestamp(),
			})
		})

		await batch.commit()
		return boardId
	}

	return { createBoard }
}
