import { useEffect, useMemo, useState } from 'react' // Added useMemo
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

	// Select the raw tasks array and the setTasks action.
	// setTasks from Zustand store is stable.
	// allTasks will change reference when the store's tasks array is updated.
	const { allTasks, setTasks } = useTaskStore(
		useShallow(state => ({
			allTasks: state.tasks,
			setTasks: state.setTasks,
			// isLoadingTasks: state.isLoadingTasks, // If needed for a global loading state
		}))
	)

	// Compute filteredTasks using useMemo.
	// This will only re-calculate if allTasks or list.id changes.
	const filteredTasks = useMemo(() => {
		return allTasks.filter(task => task.listId === list.id)
	}, [allTasks, list.id])

	// const isLoadingTasks = useTaskStore(state => state.isLoadingTasks); // If using a global loading indicator

	const { addTask } = useCreateTask()
	const { moveTask } = useMoveTask()
	const { updateListTitle } = useUpdateListTitle()
	const currentUser = useAuthStore(state => state.user)

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
	}, [list.id, currentUser?.uid, setTasks]) // setTasks is stable

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
