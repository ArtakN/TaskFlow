import { useDeleteBoard } from '@/features/delete-board'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'
import { Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface DeleteBoardMenuItemProps {
	boardId: string
	boardTitle: string
}

export function DeleteBoardMenuItem({
	boardId,
	boardTitle,
}: DeleteBoardMenuItemProps) {
	const { deleteBoard } = useDeleteBoard()
	const navigate = useNavigate()

	const handleDeleteClick = () => {
		if (
			window.confirm(
				`Delete board "${boardTitle}"? This will also delete all its lists and tasks!`
			)
		) {
			deleteBoard(boardId)
			navigate('/')
		}
	}

	return (
		<DropdownMenuItem onClick={handleDeleteClick} variant='destructive'>
			<Trash2 />
			<span>Delete Board</span>
		</DropdownMenuItem>
	)
}
