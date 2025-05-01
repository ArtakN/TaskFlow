interface DeleteBoardButtonProps {
	onDelete: () => void
}

export function DeleteBoardButton({ onDelete }: DeleteBoardButtonProps) {
	function handleClick() {
		onDelete()
	}

	return (
		<button onClick={handleClick} className='text-red-500 hover:text-red-700'>
			Delete board
		</button>
	)
}
