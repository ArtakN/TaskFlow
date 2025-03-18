import { createBoardFeature } from '@features/craete-board/index.ts'
import CreateBoardButton from '@shared/ui/CreateBoardButton.tsx'

function NewBoard() {
	const handleClick = (): void => {
		createBoardFeature()
	}

	return (
		<>
			<CreateBoardButton onClick={handleClick} />{' '}
		</>
	)
}

export default NewBoard
