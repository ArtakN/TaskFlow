interface CreateBoardButtonProps {
	onClick: () => void
	title?: string
	isLoading?: boolean
}

export function CreateBoardButton({
	title,
	onClick,
	isLoading = false,
}: CreateBoardButtonProps) {
	const isDisabled = isLoading || !title?.trim()

	return (
		<button
			onClick={onClick}
			style={{
				backgroundColor: title ? '#4D95FF' : undefined,
				color: title ? '#000' : undefined,
			}}
			className='bg-[#2C343C] w-full h-10 rounded-lg cursor-pointer text-[#546371] font-semibold disabled:cursor-not-allowed disabled:opacity-70'
			disabled={isDisabled}
		>
			{isLoading ? 'Creating...' : 'Create'}
		</button>
	)
}
