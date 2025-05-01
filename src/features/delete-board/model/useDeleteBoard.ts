import { useBoardStore } from '@/entities/board'
import { useListStore } from '@/entities/list'
import { useTaskStore } from '@/entities/task'

export function useDeleteBoard() {
	const deleteBoardByBoardId = useBoardStore(state => state.deleteBoard)
	const deleteListsByBoardId = useListStore(state => state.deleteListsByBoardId)
	const deleteTasksByBoardId = useTaskStore(state => state.deleteTasksByBoardId)

	function deleteBoard(boardId: string) {
		deleteBoardByBoardId(boardId)
		deleteListsByBoardId(boardId)
		deleteTasksByBoardId(boardId)
	}

	return { deleteBoard }
}
