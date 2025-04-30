import { Board, BoardCard } from '@/entities/board'
import { useOpenBoard } from '@/features/open-board'

interface BoardsListProps {
	boards: Board[]
}

export function BoardsList({ boards }: BoardsListProps) {
	const openBoard = useOpenBoard()

	return (
		<div className='flex flex-wrap gap-4 ml-4'>
			{boards.map(board => (
				<BoardCard
					key={board.id}
					board={board}
					onClick={() => openBoard(board.id)}
				/>
			))}
		</div>
	)
}
