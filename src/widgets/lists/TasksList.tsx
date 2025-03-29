import { useAppStore } from '@/app/store'
import { List } from '@/entities/list/model/types.ts'
import { NewTaskCard } from '@/entities/task/ui/NewTaskCard'
import { TaskCard } from '@/entities/task/ui/TaskCard'
import { useCreateTask } from '@/features/create-task/useCreateTask'
import { useMoveTask } from '@/features/move-task/useMoveTask'

interface TasksListProps {
	list: List
}

export function TasksList({ list }: TasksListProps) {
	const tasks = useAppStore(state => state.tasks)
	const filteredTasks = tasks.filter(
		task => task.listId === list.id && task.boardId === list.boardId
	)

	const { createTaskCard } = useCreateTask()
	const { moveTaskCard } = useMoveTask()

	const handleSaveTask = (taskTitle: string) => {
		createTaskCard(list.boardId, list.id, taskTitle)
	}

	const handleMoveCard = (
		taskId: string,
		fromListId: string,
		toListId: string
	) => {
		if (fromListId !== toListId) {
			moveTaskCard(taskId, fromListId, toListId)
		}
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		const taskId = e.dataTransfer.getData('taskId')
		const fromListId = e.dataTransfer.getData('fromListId')

		if (taskId && fromListId) {
			handleMoveCard(taskId, fromListId, list.id) // Move to current list
		}
	}

	return (
		<div
			className='bg-black p-2 w-2xs rounded-lg shadow-sm'
			onDragOver={e => e.preventDefault()} // Allow dropping
			onDrop={handleDrop} // Handle drop event
		>
			<div className='font-semibold p-2'>{list.title}</div>
			<div className='flex flex-col gap-2'>
				{filteredTasks.map(task => (
					<TaskCard key={task.id} task={task} onMove={handleMoveCard} />
				))}
			</div>
			<NewTaskCard onSave={handleSaveTask} />
		</div>
	)
}
