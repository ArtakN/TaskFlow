import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import type { Board } from '@/entities/board'
import { selectListsByBoardId, useListStore, type List } from '@/entities/list'
import { useAuthStore } from '@/entities/user'

import {
	EditBoardTitle,
	useUpdateBoardTitle,
} from '@/features/edit-board-title'
import { AddTaskList } from '@/widgets/add-task-list'
import { BoardOptionsMenu } from '@/widgets/board-options-menu'
import { TasksList } from '@/widgets/tasks-list'

import { db } from '@/app/firebase/config'
import {
	collection,
	doc,
	onSnapshot as onCollectionSnapshot,
	onSnapshot as onDocSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore'

import { useShallow } from 'zustand/react/shallow'

export function BoardPage() {
	const [editTitleInputVisible, setEditTitleInputVisible] = useState(false)
	const { id: boardIdFromParams } = useParams<{ id?: string }>()

	const [currentBoard, setCurrentBoard] = useState<Board | null | undefined>(
		undefined
	)
	const [isLoadingBoard, setIsLoadingBoard] = useState(true)

	const { updateBoardTitle } = useUpdateBoardTitle()

	const setLists = useListStore(state => state.setLists)
	const isLoadingLists = useListStore(state => state.isLoadingLists)
	const boardLists = useListStore(
		useShallow(selectListsByBoardId(boardIdFromParams || ''))
	)

	const currentUser = useAuthStore(state => state.user)

	useEffect(() => {
		if (!boardIdFromParams || !currentUser?.uid) {
			setIsLoadingBoard(false)
			setCurrentBoard(null)
			return
		}

		setIsLoadingBoard(true)
		const boardDocRef = doc(db, 'boards', boardIdFromParams)

		const unsubscribeBoard = onDocSnapshot(
			boardDocRef,
			docSnap => {
				if (docSnap.exists()) {
					const boardData = { id: docSnap.id, ...docSnap.data() } as Board
					if (boardData.userId === currentUser.uid) {
						setCurrentBoard(boardData)
					} else {
						console.warn(
							'BoardPage: User does not have permission or board userId mismatch.'
						)
						setCurrentBoard(null)
					}
				} else {
					setCurrentBoard(null)
				}
				setIsLoadingBoard(false)
			},
			error => {
				console.error('BoardPage: Error fetching board snapshot:', error)
				setIsLoadingBoard(false)
				setCurrentBoard(null)
			}
		)

		return () => {
			unsubscribeBoard()
		}
	}, [boardIdFromParams, currentUser?.uid])

	useEffect(() => {
		if (!boardIdFromParams || !currentUser?.uid) {
			setLists([])
			return
		}
		useListStore.setState({ isLoadingLists: true })
		const q = query(
			collection(db, 'lists'),
			where('boardId', '==', boardIdFromParams),
			where('userId', '==', currentUser.uid),
			orderBy('createdAt', 'asc')
		)
		const unsubscribeLists = onCollectionSnapshot(
			q,
			querySnapshot => {
				const fetchedLists: List[] = []
				querySnapshot.forEach(doc => {
					fetchedLists.push({ id: doc.id, ...doc.data() } as List)
				})
				setLists(fetchedLists)
			},
			error => {
				console.error('BoardPage: Error fetching lists snapshot: ', error)
				setLists([])
				useListStore.setState({ isLoadingLists: false })
			}
		)
		return () => {
			unsubscribeLists()
		}
	}, [boardIdFromParams, currentUser?.uid, setLists])

	if (isLoadingBoard) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<p>Loading board data...</p>
			</div>
		)
	}

	if (!currentBoard) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<h1 className='text-2xl font-semibold'>Board not found</h1>
				<p className='mt-2'>
					The board you are looking for does not exist or you do not have
					permission to view it.
				</p>
			</div>
		)
	}

	function onTitleEdit(_boardId: string, newTitle: string) {
		if (newTitle.trim() && newTitle !== currentBoard?.title) {
			updateBoardTitle(currentBoard!.id, newTitle.trim())
		}
		setEditTitleInputVisible(false)
	}

	return (
		<>
			<div className='flex items-center justify-between mb-4 bg-black/25 p-4 absolute left-0 top-[45px] w-full'>
				{editTitleInputVisible ? (
					<EditBoardTitle
						initialTitle={currentBoard.title}
						id={currentBoard.id}
						onSave={onTitleEdit}
					/>
				) : (
					<h1
						className='text-2xl font-semibold '
						onClick={() => setEditTitleInputVisible(true)}
					>
						{currentBoard.title}
					</h1>
				)}
				<BoardOptionsMenu
					boardId={currentBoard.id}
					boardTitle={currentBoard.title}
				/>
			</div>

			<div className='flex items-start gap-4 overflow-x-auto pb-4 mt-14'>
				{isLoadingLists && (
					<div className='text-muted-foreground'>Loading lists...</div>
				)}
				{boardLists.map(list => (
					<TasksList list={list} key={list.id} />
				))}
				<AddTaskList boardId={currentBoard.id} />
			</div>
		</>
	)
}
