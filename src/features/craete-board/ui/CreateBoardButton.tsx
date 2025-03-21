interface CreateBoardButtonProps {
	onClick: () => void
	title?: string
}

export function CreateBoardButton({ title, onClick }: CreateBoardButtonProps) {
	return (
		<button
			onClick={onClick}
			style={{
				backgroundColor: title ? '#4D95FF' : undefined,
				color: title ? '#000' : undefined,
			}}
			className='bg-[#2C343C] w-full h-10 rounded-lg cursor-pointer text-[#546371] font-semibold'
		>
			Create
		</button>
	)
}
