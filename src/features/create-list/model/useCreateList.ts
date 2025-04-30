import { useListStore } from '@/entities/list'

export function useCreateList() {
	const addList = useListStore(state => state.addList)

	return { addList }
}
