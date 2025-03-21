import { CreateBoardPopup } from '@/features/craete-board/ui/CreateBoardPopup'
import { CreateBoardButton } from '@shared/ui/CreateBoardButton.tsx'
import { useState } from 'react'

const boardBgColors = [
	{ id: '1', title: 'brown' },
	{ id: '2', title: 'green' },
	{ id: '3', title: 'blue' },
	{ id: '4', title: 'yellow' },
	{ id: '5', title: 'purple' },
	{ id: '6', title: 'orange' },
	{ id: '7', title: 'pink' },
	{ id: '8', title: 'gray' },
	{ id: '10', title: 'teal' },
]

export function NewBoard() {
	const [createBoardPopupVisible, setCreateBoardPopupVisible] = useState(false)

	const handleClick = (): void => {
		setCreateBoardPopupVisible(true)
	}

	const handleClosePopup = (): void => {
		setCreateBoardPopupVisible(false)
	}

	return (
		<div>
			<CreateBoardButton onClick={handleClick} />
			{createBoardPopupVisible && (
				<CreateBoardPopup colors={boardBgColors} onClose={handleClosePopup} />
			)}
		</div>
	)
}
