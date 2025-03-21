import { useAppStore } from '@/app/store'
import { BoardsList } from '@/widgets/boards/BoardsList'
import { NewBoard } from '@/widgets/boards/NewBoard'

export function BoardsPage() {
	const boards = useAppStore(state => state.boards)

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
