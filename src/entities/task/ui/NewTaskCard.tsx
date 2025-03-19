import AddTaskCardButton from '@/shared/ui/AddTaskCardButton'
import AddTaskCardInput from '@/shared/ui/AddTaskCardInput'
import CloseTaskCardButton from '@/shared/ui/CloseTaskCardButton'
import SaveTaskCardButton from '@/shared/ui/SaveTaskCardButton'
import { useState } from 'react'

interface NewTaskCardProps {
	onSave: (taskTitle: string) => void
}

function NewTaskCard({ onSave }: NewTaskCardProps) {
	const [taskInputVisible, setTaskInputVisible] = useState(false)
	const [cardInputText, setCardInputText] = useState('')

	function saveCard() {
		if (cardInputText) {
			onSave(cardInputText)
			setCardInputText('')
		} else {
			setTaskInputVisible(false)
			setCardInputText('')
		}
	}

	return (
		<div>
			{taskInputVisible && (
				<div>
					<AddTaskCardInput setCardInputText={setCardInputText} />
					<div className='flex items-center mt-2 gap-2'>
						<SaveTaskCardButton onClick={() => saveCard()} />
						<CloseTaskCardButton onClick={() => setTaskInputVisible(false)} />
					</div>
				</div>
			)}
			{!taskInputVisible && (
				<AddTaskCardButton onClick={() => setTaskInputVisible(true)} />
			)}
		</div>
	)
}

export default NewTaskCard
