import { useTaskStore } from '@/entities/task'

export function useMoveTask() {
	const moveTask = useTaskStore(state => state.moveTask)

	return { moveTask }
}
