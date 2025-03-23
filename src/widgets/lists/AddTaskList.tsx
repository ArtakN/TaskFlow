import { AddListButton } from '@/entities/list/ui/AddListButton'
import { AddListForm } from '@/entities/list/ui/AddListForm'
import { useCreateList } from '@/features/create-list/model/useCreateList'
import { useState } from 'react'

interface AddTaskListProps {
	boardId: string
}

export function AddTaskList({ boardId }: AddTaskListProps) {
	const [addListFormVisible, setAddListFormVisible] = useState(false)
	const [listTitle, setListTitle] = useState('')

	const { createList } = useCreateList()

	const handleClick = () => {
		setAddListFormVisible(true)
	}

	const handleClose = () => {
		setAddListFormVisible(false)
	}

	const handleSaveTask = () => {
		if (listTitle) {
			createList(boardId, listTitle)
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
