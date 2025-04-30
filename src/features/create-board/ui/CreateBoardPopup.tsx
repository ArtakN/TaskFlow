// @features/create-board/ui/CreateBoardPopup.tsx
import { Color } from '@/entities/board'
import { CloseButton } from '@/shared/ui/CloseButton'
import { useState } from 'react'
import { useCreateBoard } from '../model/useCreateBoard'
import { BoardTitleInput } from './BoardTitleInput'
import { ColorPicker } from './ColorPicker'
import { CreateBoardButton } from './CreateBoardButton'

interface CreateBoardPopupProps {
	colors: Color[] // Список доступных цветов
	onClose: () => void // Функция закрытия попапа
}

export function CreateBoardPopup({ colors, onClose }: CreateBoardPopupProps) {
	// Локальный стейт для названия доски и выбранного цвета
	const [boardTitle, setBoardTitle] = useState('')
	const [boardBgColor, setBoardBgColor] = useState('')

	// Используем кастомный хук для создания доски
	const { createBoard } = useCreateBoard()

	// Обработчик выбора цвета
	const handleChooseColor = (color: string) => {
		setBoardBgColor(color)
	}

	// Обработчик создания доски
	const handleCreateBoard = () => {
		createBoard(boardTitle, boardBgColor) // Создаем доску с указанными параметрами
		onClose() // Закрываем попап после создания
	}

	return (
		<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 bg-[#272E34] border border-[#38424B] rounded-lg px-3 py-4 shadow-lg'>
			{/* Кнопка закрытия попапа */}
			<div className='w-8 h-8 ml-auto cursor-pointer absolute right-2'>
				<CloseButton onClick={onClose} />
			</div>

			{/* Заголовок */}
			<h2 className='text-center font-semibold mb-4 text-[18px]'>
				Create board
			</h2>

			{/* Выбор цвета доски */}
			<div className='mb-4'>
				<p className='mb-2 text-[#A3B0BE]'>Background</p>
				<ColorPicker
					colors={colors}
					selectedColor={boardBgColor}
					onSelect={handleChooseColor}
				/>
			</div>

			{/* Поле ввода названия доски */}
			<div className='mb-2 text-[#A3B0BE]'>Board title</div>
			<div className='mb-4'>
				<BoardTitleInput onChange={setBoardTitle} boardTitle={boardTitle} />
			</div>

			{/* Кнопка создания доски */}
			<CreateBoardButton title={boardTitle} onClick={handleCreateBoard} />
		</div>
	)
}
