import { useAppStore } from '@/app/store'

export function useMoveTask() {
	const moveTask = useAppStore(state => state.moveTask)

	const moveTaskCard = (
		taskId: string,
		fromListId: string,
		toListId: string
	) => {
		moveTask(taskId, fromListId, toListId)
	}

	return { moveTaskCard }
}
