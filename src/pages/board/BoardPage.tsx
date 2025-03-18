import { Board } from '@/entities/board/model/types'
import AddTaskListButton from '@/shared/ui/AddTaskListButton'
import { List } from '@/widgets/tasks/model/types'
import TasksList from '@/widgets/tasks/ui/TasksList'
import { useParams } from 'react-router-dom'

const mockBoards: Board[] = [
	{ id: '1', title: 'Board 1' },
	{ id: '2', title: 'Board 2' },
	{ id: '3', title: 'Board 3' },
]

const mockLists: List[] = [
	{ id: '1', label: 'To Do' },
	{ id: '2', label: 'In Progress' },
	{ id: '3', label: 'Done' },
]

function BoardPage() {
	const { id } = useParams<{ id: string }>()
	const board = mockBoards.find(board => board.id === id)

	if (!board) {
		return <div>Board not found</div>
	}

	return (
		<div>
			<h1 className='text-2xl font-semibold mb-4'>{board.title}</h1>
			<div className='flex items-start'>
				<div className='flex gap-4'>
					{mockLists.map(list => (
						<TasksList list={list} key={list.id} />
					))}
				</div>
				<AddTaskListButton />
			</div>
		</div>
	)
}

export default BoardPage
