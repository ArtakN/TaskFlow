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

	const handleSaveTask = (taskText: string) => {
		addTask(list.boardId, list.id, taskText)
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
			className='bg-black rounded-lg p-2 shadow-sm w-[270px] flex flex-col min-h-fit'
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
					<div className='flex gap-3 items-start justify-between'>
						<div
							onClick={() => setEditTitleInputVisible(true)}
							className='font-semibold break-all overflow-wrap-anywhere cursor-pointer rounded w-full'
						>
							<p className='whitespace-pre-wrap break-words w-full'>
								{list.title}
							</p>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className='p-1 rounded hover:bg-white/10 flex-shrink-0'>
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

			<div className='flex flex-col gap-2 overflow-y-auto'>
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
