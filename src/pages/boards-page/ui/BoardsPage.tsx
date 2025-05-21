import { BoardsList } from '@/widgets/boards-list'
import { NewBoard } from '@/widgets/new-board'
import { db } from '@app/firebase/config'
import { useBoardStore, type Board } from '@entities/board'
import { useAuthStore } from '@entities/user'
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
import { useEffect } from 'react'

export function BoardsPage() {
	const boards = useBoardStore(state => state.boards)

	const setBoards = useBoardStore(state => state.setBoards)
	const setLoadingBoards = useBoardStore(state => state.setLoadingBoards)
	const currentUser = useAuthStore(state => state.user)

	useEffect(() => {
		if (!currentUser?.uid) {
			setBoards([])
			setLoadingBoards(false)
			return
		}

		setLoadingBoards(true)

		const q = query(
			collection(db, 'boards'),
			where('userId', '==', currentUser.uid),
			orderBy('createdAt', 'desc')
		)

		const unsubscribe = onSnapshot(q, querySnapshot => {
			const boards: Board[] = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...(doc.data() as Omit<Board, 'id'>),
			}))

			setBoards(boards)
			setLoadingBoards(false)
		})

		return () => unsubscribe()
	}, [currentUser?.uid, setBoards, setLoadingBoards])

	return (
		<div>
			<h1 className='text-2xl font-semibold mb-4'>Boards</h1>
			<div className='flex '>
				<NewBoard />
				<BoardsList boards={boards} />
			</div>
		</div>
	)
}
