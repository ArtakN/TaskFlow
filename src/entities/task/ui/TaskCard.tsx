interface TaskCardPorps {
	task: task
	onHover: () => void
	onClick: () => void
}

function TaskCard({task, onHover, onClick}: TaskCardPorps}) {
	return <div className='boder'>task.title</div>
}

export default TaskCard
