interface DeleteBoardButtonProps {
	boardId: string
	onDelete: (id: string) => void
	boardTitle: string
}

export function DeleteBoardButton({
	boardId,
	onDelete,
}: DeleteBoardButtonProps) {
	function handleClick() {
		onDelete(boardId)
	}

	return <button onClick={handleClick}></button>
}
