import { useBoardStore } from '@/entities/board'
import { useListStore } from '@/entities/list'
import { nanoid } from 'nanoid'

export function useCreateBoard() {
	const addBoard = useBoardStore(state => state.addBoard)
	const addList = useListStore(state => state.addList)

	const createBoard = (title: string, bgColor: string) => {
		const boardId = nanoid(8)

		addBoard(boardId, title, bgColor)
		;['To Do', 'In Progress', 'Done'].forEach(listTitle =>
			addList(boardId, listTitle)
		)
	}

	return { createBoard }
}
