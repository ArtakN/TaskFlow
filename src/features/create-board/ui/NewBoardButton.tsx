interface CreateBoardButtonProps {
	onClick?: () => void
}

export function NewBoardButton({ onClick }: CreateBoardButtonProps) {
	return (
		<button
			onClick={onClick}
			className='w-72 h-25 rounded-lg cursor-pointer bg-[#262D34] shadow hover:bg-[#313C45] text-[#A3B0BE]'
		>
			Create new board
		</button>
	)
}
