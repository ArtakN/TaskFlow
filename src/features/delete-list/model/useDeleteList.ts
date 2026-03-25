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

export function useDeleteList() {
	const currentUser = useAuthStore(state => state.user)

	const deleteList = async (listId: string) => {
		if (!currentUser?.uid) {
			console.error('User is not authenticated. Cannot delete list.')
			return false
		}

		try {
			const tasksQuery = query(
				collection(db, 'tasks'),
				where('listId', '==', listId),
				where('userId', '==', currentUser.uid)
			)
			const tasksSnapshot = await getDocs(tasksQuery)
			const batch = writeBatch(db)

			tasksSnapshot.forEach(documentSnapshot => {
				batch.delete(documentSnapshot.ref)
			})

			batch.delete(doc(db, 'lists', listId))
			await batch.commit()

			return true
		} catch (error) {
			console.error(`Error deleting list ${listId}:`, error)
			return false
		}
	}

	return {
		deleteList,
	}
}
