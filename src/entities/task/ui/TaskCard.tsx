import { Task } from '@/entities/task/model/types'

interface TaskCardPorps {
	task: Task
}

export function TaskCard({ task }: TaskCardPorps) {
	return <div className='bg-[#21272C] rounded-lg px-3 py-2'>{task.title}</div>
}
