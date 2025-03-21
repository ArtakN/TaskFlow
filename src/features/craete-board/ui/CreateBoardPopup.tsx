import { useAppStore } from '@/app/store'
import { CloseButton } from '@/shared/ui/CloseButton'
import { TitleInput } from '@/shared/ui/TitleInput'
import { useState } from 'react'
import { Color } from '../../../entities/board/model/types'
import { CreateBoardButton } from './CreateBoardButton'

interface CreateBoardPopupProps {
	colors: Color[]
	onClose: () => void
}

export function CreateBoardPopup({ colors, onClose }: CreateBoardPopupProps) {
	const [boardTitle, setBoardTitle] = useState('')
	const [boardBgColor, setBoardBgColor] = useState('')

	function handleChooseColor(color: string) {
		setBoardBgColor(color)
	}

	const addBoard = useAppStore(state => state.addBoard)

	const handleCreateBoard = () => {
		addBoard(boardTitle, boardBgColor)
		onClose()
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
				<div className='flex flex-wrap justify-between  gap-2'>
					{colors.map(color => (
						<div
							onClick={() => handleChooseColor(color.title)}
							className='w-21 h-10 rounded-sm cursor-pointer'
							key={color.id}
							style={{
								backgroundColor: color.title,
								border:
									boardBgColor === color.title ? '3px solid #fff' : undefined,
							}}
						></div>
					))}
				</div>
			</div>
			<div className='mb-2 text-[#A3B0BE]'>Board title</div>
			<div className='mb-4'>
				<TitleInput onChange={setBoardTitle} />
			</div>
			<CreateBoardButton title={boardTitle} onClick={handleCreateBoard} />
		</div>
	)
}
