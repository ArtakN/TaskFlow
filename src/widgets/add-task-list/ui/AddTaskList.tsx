import { AddListButton, AddListForm } from '@/entities/list'
import { useCreateList } from '@/features/create-list'
import { useState } from 'react'

interface AddTaskListProps {
	boardId: string
}

export function AddTaskList({ boardId }: AddTaskListProps) {
	const [addListFormVisible, setAddListFormVisible] = useState(false)
	const [listTitle, setListTitle] = useState('')

	const { addList } = useCreateList()

	const handleClick = () => {
		setAddListFormVisible(true)
	}

	const handleClose = () => {
		setAddListFormVisible(false)
	}

	const handleSaveTask = () => {
		if (listTitle) {
			addList(boardId, listTitle)
			handleClose()
			setListTitle('')
		} else {
			handleClose()
		}
	}

	return (
		<div>
			{!addListFormVisible ? (
				<AddListButton onClick={handleClick} />
			) : (
				<AddListForm
					onClose={handleClose}
					setListTitle={setListTitle}
					onSave={handleSaveTask}
				/>
			)}
		</div>
	)
}
