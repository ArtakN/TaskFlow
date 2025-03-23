import { Plus } from 'lucide-react'

interface AddListButtonProps {
	onClick: () => void
}

export function AddListButton({ onClick }: AddListButtonProps) {
	return (
		<button
			onClick={onClick}
			className='bg-[rgba(255,255,255,0.3)] w-64 text-start p-2 rounded-lg flex items-center cursor-pointer ml-4 shadow-sm hover:bg-[rgba(255,255,255,0.25)]'
		>
			<Plus className='w-4 h-4 mr-2' />
			Add a list
		</button>
	)
}
