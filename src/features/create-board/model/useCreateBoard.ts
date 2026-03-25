import { useBoardStore } from '@/entities/board'
import { useListStore } from '@/entities/list'
import { nanoid } from 'nanoid'

export function useCreateBoard() {
	const addBoard = useBoardStore(state => state.addBoard)
	const addList = useListStore(state => state.addList)

	const createBoard = async (title: string, bgColor: string) => {
		const boardId = nanoid(8)

		await addBoard(boardId, title, bgColor)
		await Promise.all(
			['To Do', 'In Progress', 'Done'].map(listTitle =>
				addList(boardId, listTitle)
			)
		)
		return boardId
	}

	return { createBoard }
}
