import { useTaskStore } from '@/entities/task'

export function useDeleteTask() {
	const deleteTask = useTaskStore(state => state.deleteTask)

	return { deleteTask }
}
