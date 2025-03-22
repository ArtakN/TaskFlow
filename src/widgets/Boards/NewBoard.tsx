import { useAppStore } from '@/app/store'
import { CreateBoardPopup } from '@/features/create-board/ui/CreateBoardPopup'
import { NewBoardButton } from '@/features/create-board/ui/NewBoardButton'
import { useState } from 'react'

export function NewBoard() {
	const [createBoardPopupVisible, setCreateBoardPopupVisible] = useState(false)

	const colors = useAppStore(state => state.colors)

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
