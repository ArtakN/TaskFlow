import { useAppStore } from '@/app/store'

export function useCreateTask() {
	const addTask = useAppStore(state => state.addTask)

	const createTaskCard = (
		boardId: string,
		listId: string,
		taskTitle: string
	) => {
		addTask(boardId, listId, taskTitle)
	}

	return { createTaskCard }
}
