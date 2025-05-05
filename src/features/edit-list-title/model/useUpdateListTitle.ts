import { useListStore } from '@entities/list'

export function useUpdateListTitle() {
	const updateListTitle = useListStore(state => state.updateListTitle)

	return { updateListTitle }
}
