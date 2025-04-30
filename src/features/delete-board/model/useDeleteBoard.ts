import { useBoardStore } from '@/entities/board'

export function useDeleteBoard() {
	const deleteBoard = useBoardStore(state => state.deleteBoard)

	return deleteBoard
}
