import { List } from '@/entities/list'
import {
	NewTaskCard,
	selectTaskByListId,
	TaskCard,
	useTaskStore,
} from '@/entities/task'
import { useCreateTask } from '@/features/create-task'
import { useMoveTask } from '@/features/move-task'
import { useShallow } from 'zustand/react/shallow'

interface TasksListProps {
	list: List
}

export function TasksList({ list }: TasksListProps) {
	const filteredTasks = useTaskStore(useShallow(selectTaskByListId(list.id))) // Используйте ваше имя селектора

	const { addTask } = useCreateTask()
	const { moveTask } = useMoveTask()

	const handleSaveTask = (taskTitle: string) => {
		addTask(list.boardId, list.id, taskTitle)
	}

	const handleMoveCard = (
		taskId: string,
		fromListId: string,
		toListId: string
	) => {
		if (fromListId !== toListId) {
			moveTask(taskId, fromListId, toListId)
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
