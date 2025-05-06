import { useBoardStore } from '@/entities/board'
import { selectListsByBoardId, useListStore } from '@/entities/list'
import {
	EditBoardTitle,
	useUpdateBoardTitle,
} from '@/features/edit-board-title'
import { AddTaskList } from '@/widgets/add-task-list'
import { BoardOptionsMenu } from '@/widgets/board-options-menu'
import { TasksList } from '@/widgets/tasks-list'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

export function BoardPage() {
	const [editTitleInputVisible, setEditTitleInputVisible] = useState(false)
	const { id } = useParams<{ id?: string }>()
	const boards = useBoardStore(state => state.boards)
	const boardLists = useListStore(useShallow(selectListsByBoardId(id || '')))
	const board = boards.find(board => board.id === id)

	const { updateBoardTitle } = useUpdateBoardTitle()

	if (!board) {
		return <div>Board not found</div>
	}

	function onTitleEdit(id: string, currentTitle: string) {
		if (currentTitle !== board?.title) {
			updateBoardTitle(id, currentTitle)
		}
		setEditTitleInputVisible(false)
	}

	return (
		<div>
			<div className='flex items-center justify-between mb-4 bg-black/25 p-4  absolute left-0 top-[45px] w-full'>
				{editTitleInputVisible ? (
					<EditBoardTitle
						initialTitle={board.title}
						id={board.id}
						onSave={onTitleEdit}
					/>
				) : (
					<h1
						className='text-2xl font-semibold '
						onClick={() => setEditTitleInputVisible(true)}
					>
						{board.title}
					</h1>
				)}
				<BoardOptionsMenu boardId={board.id} boardTitle={board.title} />
			</div>

			<div className='flex items-start mt-14'>
				<div className='flex gap-4'>
					{boardLists.map(list => (
						<TasksList list={list} key={list.id} />
					))}
				</div>
				<AddTaskList boardId={board.id} />
			</div>
		</div>
	)
}
