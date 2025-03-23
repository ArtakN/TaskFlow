// @features/create-board/model/useCreateBoard.ts
import { useAppStore } from '@/app/store'
import { nanoid } from 'nanoid'

export function useCreateBoard() {
	// Получаем функции из zustand стора для работы с досками и списками
	const addBoard = useAppStore(state => state.addBoard)
	const addList = useAppStore(state => state.addList)

	// Функция создания доски
	const createBoard = (title: string, bgColor: string) => {
		// Генерируем уникальный ID для доски
		const boardId = nanoid(8)

		// Добавляем доску в стор
		addBoard(boardId, title, bgColor)

		// Автоматически создаем 3 стандартных списка
		;['To Do', 'In Progress', 'Done'].forEach(listTitle =>
			addList(boardId, listTitle)
		)
	}

	return { createBoard }
}
