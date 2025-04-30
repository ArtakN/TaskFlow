import { create } from 'zustand'
import { Board, Color } from './types'

// Этот интерфейс описивает этот стор
interface BoardState {
	boards: Board[] // Это свойство будет хранить массив всех объектов досок в приложении. Тип Board[] означает "массив объектов, соответствующих интерфейсу Board
	colors: Color[] // Этот массив содержит доступные цвета для выбора фона доски.
	addBoard: (id: string, title: string, color: string) => void // Это сигнатура экшена (функции) для добавления новой доски. Она описывает, что функция addBoard принимает id, title, color (все строки) и ничего не возвращает (void). Экшены - это методы для изменения состояния стора.
	updateBoardTitle: (id: string, newTitle: string) => void // Экшен для изменения названия доски
	deleteBoard: (id: string) => void // Экшен для удаления доски
}

// Создаем сам стор (хранилища) - это хук
export const useBoardStore = create<BoardState>(set => ({
	boards: [], // началное состояние досок: изначално досок нет
	colors: [
		// начальное состояние - массив цветов
		{ id: '1', title: 'brown' },
		{ id: '2', title: 'green' },
		{ id: '3', title: 'blue' },
		{ id: '4', title: 'yellow' },
		{ id: '5', title: 'purple' },
		{ id: '6', title: 'orange' },
		{ id: '7', title: 'pink' },
		{ id: '8', title: 'gray' },
		{ id: '10', title: 'teal' },
	],
	// Методы изменяют состояние через функцию set от Zustand
	addBoard: (id: string, title: string, color: string) =>
		set(state => ({
			boards: [...state.boards, { id, title, color }],
		})), // Zustand вызывает функцию set передавая в неё state (state - это текущее состояние хранилища: boards, colors и методы). Далее set получает новый обект (boards) и обновляет state с новым обектом.

	// Реализация экшена обновления заголовка
	updateBoardTitle: (id: string, newTitle: string) =>
		set(state => ({
			boards: state.boards.map(board =>
				board.id === id ? { ...board, title: newTitle } : board
			),
		})),

	// Реализация экшена удаления
	deleteBoard: (id: string) =>
		set(state => ({
			boards: state.boards.filter(board => board.id !== id),
		})),
}))
