import { useTaskStore } from '@/entities/task'

export function useCreateTask() {
	const addTask = useTaskStore(state => state.addTask)

	return { addTask }
}
