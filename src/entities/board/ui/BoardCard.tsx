import { Board } from '@entities/board/model/types'

interface BoardCardProps {
	board: Board
	onClick: () => void
}

export const BoardCard = ({ board, onClick }: BoardCardProps) => {
	return (
		<div
			onClick={onClick}
			className='bg-[#2a3742] hover:bg-[#32414f] p-4 shadow-sm w-72 h-25 rounded-lg cursor-pointer'
			style={{ backgroundColor: board.color }}
		>
			<h3 className='text-lg font-semibold'>{board.title}</h3>
		</div>
	)
}
