import { Plus } from 'lucide-react'

interface AddTaskButtonProps {
	onClick: () => void
}

export function AddTaskCardButton({ onClick }: AddTaskButtonProps) {
	return (
		<button
			onClick={onClick}
			className='hover:bg-[#273028] w-full text-start p-2 rounded-lg mt-4 flex items-center cursor-pointer'
		>
			<Plus className='w-4 h-4 mr-2' />
			Add a card
		</button>
	)
}
