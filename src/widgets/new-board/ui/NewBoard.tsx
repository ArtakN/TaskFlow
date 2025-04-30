import { useBoardStore } from '@/entities/board'
import { CreateBoardPopup, NewBoardButton } from '@/features/create-board'
import { useState } from 'react'

export function NewBoard() {
	const [createBoardPopupVisible, setCreateBoardPopupVisible] = useState(false)
	const colors = useBoardStore(state => state.colors)

	const handleClick = (): void => {
		setCreateBoardPopupVisible(true)
	}

	const handleClosePopup = (): void => {
		setCreateBoardPopupVisible(false)
	}

	return (
		<div>
			<NewBoardButton onClick={handleClick} />
			{createBoardPopupVisible && (
				<CreateBoardPopup colors={colors} onClose={handleClosePopup} />
			)}
		</div>
	)
}
