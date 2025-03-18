import NewTask from '@/widgets/tasks/ui/NewTask.tsx'
import { List } from '@widgets/tasks/model/types'

interface TasksListProps {
	list: List
}

function TasksList({ list }: TasksListProps) {
	return (
		<div>
			<div className='bg-black p-2 w-2xs rounded-lg shadow-sm'>
				<div className='font-semibold p-2'>{list.label}</div>
				<NewTask />
			</div>
		</div>
	)
}

export default TasksList
