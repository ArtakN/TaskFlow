import { db } from '@/app/firebase/config'
import { useAuthStore } from '@/entities/user'
import {
	collection,
	doc,
	getDocs,
	query,
	where,
	writeBatch,
} from 'firebase/firestore'

export function useDeleteBoard() {
	async function deleteBoard(boardId: string) {
		const currentUser = useAuthStore.getState().user
		if (!currentUser?.uid) {
			console.error('User is not authenticated. Cannot delete board.')
			return false
		}

		try {
			const listsQuery = query(
				collection(db, 'lists'),
				where('boardId', '==', boardId),
				where('userId', '==', currentUser.uid)
			)
			const tasksQuery = query(
				collection(db, 'tasks'),
				where('boardId', '==', boardId),
				where('userId', '==', currentUser.uid)
			)

			const [listsSnapshot, tasksSnapshot] = await Promise.all([
				getDocs(listsQuery),
				getDocs(tasksQuery),
			])

			const batch = writeBatch(db)

			tasksSnapshot.forEach(documentSnapshot => {
				batch.delete(documentSnapshot.ref)
			})

			listsSnapshot.forEach(documentSnapshot => {
				batch.delete(documentSnapshot.ref)
			})

			batch.delete(doc(db, 'boards', boardId))
			await batch.commit()

			return true
		} catch (error) {
			console.error(`Error deleting board ${boardId}:`, error)
			return false
		}
	}

	return { deleteBoard }
}
