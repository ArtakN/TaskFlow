import { DeleteBoardButton, useDeleteBoard } from '@/features/delete-board'
import { useNavigate } from 'react-router-dom'
interface BoardOptionsMenuProps {
	boardId: string
	boardTitle: string
}

export function BoardOptionsMenu({
	boardId,
	boardTitle,
}: BoardOptionsMenuProps) {
	const { deleteBoard } = useDeleteBoard()
	const navigate = useNavigate()

	function handleDeleteRequest() {
		if (
			window.confirm(
				`Вы уверены, что хотите удалить доску "${boardTitle}"? 
				Это также удалит все ее списки и задачи!`
			)
		) {
			deleteBoard(boardId) // Используем boardId из props
			navigate('/')
		}
	}

	return (
		<div className='border'>
			<DeleteBoardButton onDelete={handleDeleteRequest} />
		</div>
	)
}
