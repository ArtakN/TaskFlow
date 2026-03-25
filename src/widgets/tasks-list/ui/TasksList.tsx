import { useEffect, useMemo, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { List } from '@/entities/list'
import { NewTaskCard, TaskCard, useTaskStore, type Task } from '@/entities/task'
import { useAuthStore } from '@/entities/user'

import { useCreateTask } from '@/features/create-task'
import { EditListTitle, useUpdateListTitle } from '@/features/edit-list-title'
import { useMoveTask } from '@/features/move-task'
import { DeleteListMenuItem } from '@features/delete-list'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu'
import {
	TASK_DRAG_END_EVENT,
	TASK_DRAG_START_EVENT,
	type TaskDragDetail,
} from '@/shared/lib/task-drag'
import { cn } from '@/shared/lib/utils'
import { MoreHorizontal } from 'lucide-react'

import { db } from '@/app/firebase/config'
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore'

interface TasksListProps {
	list: List
}

export function TasksList({ list }: TasksListProps) {
	const [editTitleInputVisible, setEditTitleInputVisible] = useState(false)
	const [isDropTarget, setIsDropTarget] = useState(false)
	const [activeDragFromListId, setActiveDragFromListId] = useState<string | null>(
		null
	)
	const dragDepthRef = useRef(0)

	const { allTasks, setTasks } = useTaskStore(
		useShallow(state => ({
			allTasks: state.tasks,
			setTasks: state.setTasks,
		}))
	)

	const filteredTasks = useMemo(() => {
		return allTasks.filter(task => task.listId === list.id)
	}, [allTasks, list.id])

	const { addTask } = useCreateTask()
	const { moveTask } = useMoveTask()
	const { updateListTitle } = useUpdateListTitle()
	const currentUser = useAuthStore(state => state.user)

	useEffect(() => {
		const handleTaskDragStart = (event: Event) => {
			const { detail } = event as CustomEvent<TaskDragDetail>
			setActiveDragFromListId(detail.fromListId)
			setIsDropTarget(false)
			dragDepthRef.current = 0
		}

		const handleTaskDragEnd = () => {
			setActiveDragFromListId(null)
			setIsDropTarget(false)
			dragDepthRef.current = 0
		}

		window.addEventListener(TASK_DRAG_START_EVENT, handleTaskDragStart)
		window.addEventListener(TASK_DRAG_END_EVENT, handleTaskDragEnd)

		return () => {
			window.removeEventListener(TASK_DRAG_START_EVENT, handleTaskDragStart)
			window.removeEventListener(TASK_DRAG_END_EVENT, handleTaskDragEnd)
		}
	}, [])

	useEffect(() => {
		if (!list.id || !currentUser?.uid) {
			setTasks([], list.id)
			return
		}

		const q = query(
			collection(db, 'tasks'),
			where('listId', '==', list.id),
			where('userId', '==', currentUser.uid),
			orderBy('createdAt', 'asc')
		)

		const unsubscribe = onSnapshot(
			q,
			querySnapshot => {
				const fetchedTasks: Task[] = []
				querySnapshot.forEach(doc => {
					fetchedTasks.push({ id: doc.id, ...doc.data() } as Task)
				})
				setTasks(fetchedTasks, list.id)
			},
			error => {
				console.error(`Error fetching tasks for list ${list.id}: `, error)
				setTasks([], list.id)
			}
		)

		return () => {
			unsubscribe()
		}
	}, [list.id, currentUser?.uid, setTasks])

	const handleEditTitle = (id: string, newTitle: string) => {
		if (newTitle.trim() && newTitle !== list.title) {
			updateListTitle(id, newTitle.trim())
		}
		setEditTitleInputVisible(false)
	}

	const handleSaveTask = async (taskText: string) => {
		if (taskText.trim()) {
			await addTask(list.boardId, list.id, taskText.trim())
		}
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

	const handleDragEnter = () => {
		if (!activeDragFromListId || activeDragFromListId === list.id) {
			return
		}

		dragDepthRef.current += 1
		setIsDropTarget(true)
	}

	const handleDragLeave = () => {
		if (dragDepthRef.current === 0) {
			return
		}

		dragDepthRef.current -= 1
		if (dragDepthRef.current === 0) {
			setIsDropTarget(false)
		}
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const taskId = e.dataTransfer.getData('taskId')
		const fromListId = e.dataTransfer.getData('fromListId')

		dragDepthRef.current = 0
		setIsDropTarget(false)
		setActiveDragFromListId(null)

		if (taskId && fromListId) {
			handleMoveCard(taskId, fromListId, list.id)
		}
	}

	return (
		<div
			className={cn(
				'bg-black rounded-lg p-2 shadow-sm w-[270px] flex flex-col min-h-fit border border-transparent transition-all duration-150',
				isDropTarget &&
					'border-[#4D95FF] bg-[#101820] shadow-[0_0_0_1px_rgba(77,149,255,0.25)]'
			)}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={e => {
				e.preventDefault()
				if (activeDragFromListId && activeDragFromListId !== list.id) {
					setIsDropTarget(true)
				}
			}}
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
