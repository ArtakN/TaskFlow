import { List } from '@/entities/list'
import {
	NewTaskCard,
	selectTaskByListId,
	TaskCard,
	useTaskStore,
} from '@/entities/task'
import { useCreateTask } from '@/features/create-task'
import { EditListTitle, useUpdateListTitle } from '@/features/edit-list-title'
import { useMoveTask } from '@/features/move-task'
import { DeleteListMenuItem } from '@features/delete-list'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

interface TasksListProps {
	list: List
}

export function TasksList({ list }: TasksListProps) {
	const [editTitleInputVisible, setEditTitleInputVisible] = useState(false)

	const filteredTasks = useTaskStore(useShallow(selectTaskByListId(list.id)))

	const { addTask } = useCreateTask()
	const { moveTask } = useMoveTask()
	const { updateListTitle } = useUpdateListTitle()

	const handleEditTitle = (id: string, newTitle: string) => {
		updateListTitle(id, newTitle)
		setEditTitleInputVisible(false)
	}

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
			handleMoveCard(taskId, fromListId, list.id)
		}
	}

	return (
		<div
			className='bg-black rounded-lg p-2 shadow-sm min-w-[270px] max-w-[270px] flex flex-col h-fit'
			onDragOver={e => e.preventDefault()}
			onDrop={handleDrop}
		>
			<div className='break-words mb-2 p-2'>
				{editTitleInputVisible ? (
					<EditListTitle
						onSave={handleEditTitle}
						initialTitle={list.title}
						id={list.id}
					/>
				) : (
					<div className='flex items-center justify-between '>
						<div
							onClick={() => setEditTitleInputVisible(true)}
							className='font-semibold break-words cursor-pointer rounded'
						>
							{list.title}
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className='p-1 rounded hover:bg-white/10'>
									<MoreHorizontal size={16} />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DeleteListMenuItem listId={list.id} listTitle={list.title} />
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</div>

			<div className='flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)]'>
				{filteredTasks.map(task => (
					<TaskCard key={task.id} task={task} onMove={handleMoveCard} />
				))}
			</div>

			<div className='mt-2'>
				<NewTaskCard onSave={handleSaveTask} />
			</div>
		</div>
	)
}
