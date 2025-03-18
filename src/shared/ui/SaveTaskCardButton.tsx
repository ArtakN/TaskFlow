interface SaveTaskCardButtonProps {
	onClick: () => void
}

function SaveTaskCardButton({ onClick }: SaveTaskCardButtonProps) {
	return (
		<button
			className='bg-[#4D95FF] hover:bg-[#67a2fa] h-8 w-30 rounded-sm'
			onClick={onClick}
		>
			Save
		</button>
	)
}

export default SaveTaskCardButton
