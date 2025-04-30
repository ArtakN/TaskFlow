import { useBoardStore } from '@/entities/board'

export function useUpdateBoardTitle() {
	const updateBoardTitle = useBoardStore(state => state.updateBoardTitle)

	return { updateBoardTitle }
}
