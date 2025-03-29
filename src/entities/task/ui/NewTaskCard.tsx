import { AddTaskCardButton } from '@/shared/ui/AddTaskCardButton'
import { CloseButton } from '@/shared/ui/CloseButton'
import { SaveTaskCardButton } from '@/shared/ui/SaveTaskCardButton'
import { TitleInput } from '@/shared/ui/TitleInput'
import { useState } from 'react'

interface NewTaskCardProps {
	onSave: (taskTitle: string) => void
}

export function NewTaskCard({ onSave }: NewTaskCardProps) {
	const [taskInputVisible, setTaskInputVisible] = useState(false)
	const [cardInputText, setCardInputText] = useState('')

	function saveCard() {
		if (cardInputText) {
			onSave(cardInputText)
			setTaskInputVisible(false)
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
					<TitleInput onChange={setCardInputText} />
					<div className='flex items-center mt-2 gap-2'>
						<SaveTaskCardButton onClick={() => saveCard()} />
						<CloseButton onClick={() => setTaskInputVisible(false)} />
					</div>
				</div>
			)}
			{!taskInputVisible && (
				<AddTaskCardButton onClick={() => setTaskInputVisible(true)} />
			)}
		</div>
	)
}
