import { List } from '@/entities/list/model/types.tsx'

interface TaskListProps {
	list: List
}

export function TaskList({ list }: TaskListProps) {
	return (
		<div>
			<div className='bg-black p-2 w-2xs rounded-lg shadow-sm'>
				<div className='font-semibold p-2'>{list.title}</div>
			</div>
		</div>
	)
}
