import { Board } from '@entities/board/model/types'

interface BoardCardProps {
	board: Board
	onClick: () => void
}

export const BoardCard = ({ board, onClick }: BoardCardProps) => {
	return (
		<div
			onClick={onClick}
			className='relative p-4 shadow-sm w-72 h-25 rounded-lg cursor-pointer'
			style={{ backgroundColor: board.color || '#2a3742' }}
		>
			{/* Dark overlay on hover */}
			<div className='absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 opacity-0 hover:opacity-10 rounded-lg'></div>

			<h3
				className='text-lg font-semibold truncate max-w-full'
				title={board.title}
			>
				{board.title}
			</h3>
		</div>
	)
}
