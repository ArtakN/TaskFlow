import { useTaskStore } from '@/entities/task'

export function useEditTask() {
	const editTask = useTaskStore(state => state.editTask)

	return { editTask }
}
