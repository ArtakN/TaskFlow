import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { List } from './types'

interface ListState {
	lists: List[]
	addList: (boardId: string, title: string) => void
	deleteList: (id: string) => void
	updateListTitle: (id: string, newTitle: string) => void
	deleteListsByBoardId: (boardId: string) => void
}

export const useListStore = create<ListState>(set => ({
	lists: [],
	addList: (boardId: string, title: string) =>
		set(state => ({
			lists: [...state.lists, { id: nanoid(8), title, boardId }],
		})),
	deleteList: (id: string) =>
		set(state => ({
			lists: state.lists.filter(list => list.id !== id),
		})),
	updateListTitle: (id: string, newTitle: string) =>
		set(state => ({
			lists: state.lists.map(list =>
				list.id === id ? { ...list, title: newTitle } : list
			),
		})),
	deleteListsByBoardId: (boardId: string) =>
		set(state => ({
			lists: state.lists.filter(list => list.boardId !== boardId),
		})),
}))

export const selectListsByBoardId = (boardId: string) => (state: ListState) =>
	state.lists.filter(list => list.boardId === boardId)
