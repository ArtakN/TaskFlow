import { Task } from '@/entities/task/model/types'
import { useDeleteTask } from '@/features/delete-task'
import { EditableTaskText, useEditTask } from '@/features/edit-task'
import { SquarePen, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface TaskCardPorps {
	task: Task
	onMove: (taskId: string, fromListId: string, toListId: string) => void
}

export function TaskCard({ task }: TaskCardPorps) {
	const [editIconVisible, setEditIconVisible] = useState(false)
	const [isEditTaskTextVisible, setIsEditTaskTextVisible] = useState(false)

	const { editTask } = useEditTask()
	const { deleteTask } = useDeleteTask()

	function handleEditTask(taskId: string, newText: string) {
		editTask(taskId, newText)
		setEditIconVisible(false)
		setIsEditTaskTextVisible(false)
	}

	function handleDeleteTask() {
		deleteTask(task.id)
	}

	return (
		<>
			{isEditTaskTextVisible ? (
				<EditableTaskText
					taskId={task.id}
					initialText={task.text}
					onSave={handleEditTask}
				/>
			) : (
				<div
					draggable='true'
					onDragStart={e => {
						e.dataTransfer.setData('taskId', task.id)
						e.dataTransfer.setData('fromListId', task.listId)
					}}
					className='bg-[#21272C] relative  rounded-md pl-3 pr-3 py-2 cursor-pointer hover:border hover:border-gray-400 transition-all duration-150'
					onMouseEnter={() => setEditIconVisible(true)}
					onMouseLeave={() => setEditIconVisible(false)}
				>
					<p className='whitespace-pre-wrap break-words'>{task.text}</p>
					{editIconVisible && (
						<ul className='absolute top-2 right-2  flex gap-2 items-center '>
							<li
								className='w-6 h-6 bg-black/90 rounded-full flex justify-center items-center hover:scale-110 transition-transform duration-200 group'
								onClick={() => setIsEditTaskTextVisible(true)}
							>
								<SquarePen className='w-3 h-3 group-hover:stroke-white transition-colors duration-200' />
							</li>
							<li
								className='w-6 h-6 bg-black/90 rounded-full flex justify-center items-center hover:scale-110 transition-transform duration-200 group '
								onClick={handleDeleteTask}
							>
								<Trash2 className='w-3 h-3 group-hover:stroke-red-500 transition-colors duration-200' />
							</li>
						</ul>
					)}
				</div>
			)}
		</>
	)
}
