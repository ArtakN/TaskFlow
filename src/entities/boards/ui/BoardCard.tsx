import { Board } from '@entities/boards/model/types'

interface BoardCardProps {
	board: Board
	onClick: () => void
}

export const BoardCard = ({ board, onClick }: BoardCardProps) => {
	return (
		<div
			onClick={onClick}
			className='border border-gray-300 p-4 shadow-sm w-72 h-25 rounded-lg cursor-pointer'
		>
			<h3 className='text-lg font-semibold'>{board.title}</h3>
		</div>
	)
}
