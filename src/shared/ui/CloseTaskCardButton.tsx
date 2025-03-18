import { X } from 'lucide-react'

interface CloseTaskCardButtonProps {
	onClick: () => void
}

function CloseTaskCardButton({ onClick }: CloseTaskCardButtonProps) {
	return (
		<button
			onClick={onClick}
			className=' flex items-center justify-center w-8 h-8 rounded-sm hover:bg-[#273028]'
		>
			<X className='w-4 h-4' />
		</button>
	)
}

export default CloseTaskCardButton
