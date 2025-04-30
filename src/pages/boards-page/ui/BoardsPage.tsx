import { useBoardStore } from '@/entities/board'
import { BoardsList } from '@/widgets/boards-list'
import { NewBoard } from '@/widgets/new-board'

export function BoardsPage() {
	const boards = useBoardStore(state => state.boards)

	return (
		<div>
			<h1 className='text-2xl font-semibold mb-4'>Boards</h1>
			<div className='flex '>
				<NewBoard />
				<BoardsList boards={boards} />
			</div>
		</div>
	)
}
