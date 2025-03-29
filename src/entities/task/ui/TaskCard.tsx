import { Task } from '@/entities/task/model/types'

interface TaskCardPorps {
	task: Task
	onMove: (taskId: string, fromListId: string, toListId: string) => void
}

export function TaskCard({ task }: TaskCardPorps) {
	return (
		<div
			draggable='true'
			onDragStart={e => {
				e.dataTransfer.setData('taskId', task.id)
				e.dataTransfer.setData('fromListId', task.listId) // Store list ID
			}}
			className='bg-[#21272C] rounded-lg px-3 py-2 cursor-grab'
		>
			{task.title}
		</div>
	)
}
