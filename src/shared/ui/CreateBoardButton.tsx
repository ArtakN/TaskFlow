interface CreateBoardButtonProps {
	onClick?: () => void
}

function CreateBoardButton({ onClick }: CreateBoardButtonProps) {
	return (
		<button
			onClick={onClick}
			className='w-72 h-25 rounded-lg cursor-pointer bg-[#262D34] shadow hover:bg-[#313C45] '
		>
			Create board
		</button>
	)
}

export default CreateBoardButton
