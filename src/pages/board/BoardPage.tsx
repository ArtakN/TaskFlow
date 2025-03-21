import { useAppStore } from '@/app/store'
import { AddTaskListButton } from '@/shared/ui/AddTaskListButton'
import { TasksList } from '@/widgets/tasks/TasksList'
import { useParams } from 'react-router-dom'

export function BoardPage() {
	const { id } = useParams<{ id?: string }>()
	const boards = useAppStore(state => state.boards)
	const lists = useAppStore(state => state.lists)

	if (!id) {
		return <div>Invalid board ID</div>
	}

	const board = boards.find(board => board.id === id)

	if (!board) {
		return <div>Board not found</div>
	}

	const boardLists = lists.filter(list => list.boardId === board.id)

	return (
		<div>
			<h1 className='text-2xl font-semibold mb-4'>{board.title}</h1>
			<div className='flex items-start'>
				<div className='flex gap-4'>
					{boardLists.map(list => (
						<TasksList list={list} key={list.id} />
					))}
				</div>
				<AddTaskListButton />
			</div>
		</div>
	)
}
