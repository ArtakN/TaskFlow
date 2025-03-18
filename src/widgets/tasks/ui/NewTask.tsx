import { saveTaskFeature } from '@/features/save-task'
import AddTaskCardButton from '@/shared/ui/AddTaskCardButton'
import AddTaskCardInput from '@/shared/ui/AddTaskCardInput'
import CloseTaskCardButton from '@/shared/ui/CloseTaskCardButton'
import SaveTaskCardButton from '@/shared/ui/SaveTaskCardButton'
import { useState } from 'react'

function NewTaskCard() {
	const [taskInputVisible, setTaskInputVisible] = useState(false)
	const [cardInputText, setCardInputText] = useState('')

	function saveCard() {
		if (!cardInputText) {
			setTaskInputVisible(false)
			setCardInputText('')
		} else {
			saveTaskFeature(cardInputText)
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
