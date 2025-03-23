import { useAppStore } from '@/app/store'

export function useCreateList() {
	const addList = useAppStore(state => state.addList)

	const createList = (boardId: string, listTitle: string) => {
		addList(boardId, listTitle)
	}

	return { createList }
}
