import BoardsList from '@/widgets/Boards/BoardsList'
import CreateBoard from '@/widgets/Boards/CreateBoard'
import { Board } from '@entities/boards/model/types'

const mockBoards: Board[] = [
	{ id: '1', title: 'Board 1' },
	{ id: '2', title: 'Board 2' },
	{ id: '3', title: 'Board 3' },
]

function Boards() {
	return (
		<div>
			<h1>Boards</h1>
			<div className='flex items-center'>
				<CreateBoard />
				<BoardsList boards={mockBoards} />
			</div>
		</div>
	)
}

export default Boards
