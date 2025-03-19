import { useAppStore } from '@/app/store'
import { List } from '@/entities/list/model/types.ts'
import NewTaskCard from '@/entities/task/ui/NewTaskCard'
import TaskCard from '@/entities/task/ui/TaskCard'

interface TasksListProps {
	list: List
}

function TasksList({ list }: TasksListProps) {
	const tasks = useAppStore(state => state.tasks)
	const filteredTasks = tasks.filter(
		task => task.listId === list.id && task.boardId === list.boardId
	)

	const addTask = useAppStore(state => state.addTask)

	const handleSaveTask = (taskTitle: string) => {
		addTask(list.boardId, list.id, taskTitle)
	}

	return (
		<div>
			<div className='bg-black p-2 w-2xs rounded-lg shadow-sm'>
				<div className='font-semibold p-2'>{list.title}</div>
				<div className='flex flex-col gap-2'>
					{filteredTasks.map(task => (
						<TaskCard key={task.id} task={task} />
					))}
				</div>
				<NewTaskCard onSave={handleSaveTask} />
			</div>
		</div>
	)
}

export default TasksList
