import { CloseButton } from '@/shared/ui/CloseButton'
import { SaveTaskCardButton } from '@/shared/ui/SaveTaskCardButton'
import { TitleInput } from '@/shared/ui/TitleInput'

interface AddListButtonProps {
	onClose: () => void
	setListTitle: (title: string) => void
	onSave: () => void
}

export function AddListForm({
	onClose,
	setListTitle,
	onSave,
}: AddListButtonProps) {
	return (
		<div className='w-2xs bg-black p-2 rounded-lg ml-4'>
			<TitleInput onChange={setListTitle} />
			<div className='flex gap-2 mt-2'>
				<SaveTaskCardButton onClick={onSave} />
				<CloseButton onClick={onClose} />
			</div>
		</div>
	)
}
