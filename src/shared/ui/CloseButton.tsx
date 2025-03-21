import { X } from 'lucide-react'

interface CloseButtonProps {
	onClick: () => void
}

export function CloseButton({ onClick }: CloseButtonProps) {
	return (
		<button
			onClick={onClick}
			className=' flex items-center justify-center w-8 h-8 cursor-pointer rounded-sm hover:bg-[#3B4751] text-[#A3B0BE]'
		>
			<X className='w-4 h-4' />
		</button>
	)
}
