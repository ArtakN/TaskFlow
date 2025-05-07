import { Color } from '@/entities/board'
import { CloseButton } from '@/shared/ui/CloseButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateBoard } from '../model/useCreateBoard'
import { BoardTitleInput } from './BoardTitleInput'
import { ColorPicker } from './ColorPicker'
import { CreateBoardButton } from './CreateBoardButton'

interface CreateBoardPopupProps {
	colors: Color[]
	onClose: () => void
}

export function CreateBoardPopup({ colors, onClose }: CreateBoardPopupProps) {
	const [boardTitle, setBoardTitle] = useState('')
	const [boardBgColor, setBoardBgColor] = useState('')

	const { createBoard } = useCreateBoard()
	const navigate = useNavigate()

	const handleChooseColor = (color: string) => {
		setBoardBgColor(color)
	}

	const handleCreateBoard = () => {
		const boardId = createBoard(boardTitle, boardBgColor)
		onClose()
		navigate(`/board/${boardId}`)
	}

	return (
		<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 bg-[#272E34] border border-[#38424B] rounded-lg px-3 py-4 shadow-lg'>
			<div className='w-8 h-8 ml-auto cursor-pointer absolute right-2'>
				<CloseButton onClick={onClose} />
			</div>

			<h2 className='text-center font-semibold mb-4 text-[18px]'>
				Create board
			</h2>

			<div className='mb-4'>
				<p className='mb-2 text-[#A3B0BE]'>Background</p>
				<ColorPicker
					colors={colors}
					selectedColor={boardBgColor}
					onSelect={handleChooseColor}
				/>
			</div>

			<div className='mb-2 text-[#A3B0BE]'>Board title</div>
			<div className='mb-4'>
				<BoardTitleInput onChange={setBoardTitle} boardTitle={boardTitle} />
			</div>

			<CreateBoardButton title={boardTitle} onClick={handleCreateBoard} />
		</div>
	)
}
