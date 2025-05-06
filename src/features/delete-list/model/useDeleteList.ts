import { useListStore } from '@/entities/list'
import { useTaskStore } from '@/entities/task'

export function useDeleteList() {
	const deleteListByListId = useListStore(state => state.deleteList)
	const deleteTaskByListId = useTaskStore(state => state.deleteTaskByListId)

	const deleteList = (listId: string) => {
		deleteListByListId(listId)
		deleteTaskByListId(listId)
	}

	return {
		deleteList,
	}
}
