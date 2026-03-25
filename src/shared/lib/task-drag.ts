export const TASK_DRAG_START_EVENT = 'task-drag-start'
export const TASK_DRAG_END_EVENT = 'task-drag-end'

export interface TaskDragDetail {
	taskId: string
	fromListId: string
}
