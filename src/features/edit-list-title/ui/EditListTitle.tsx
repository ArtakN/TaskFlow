import { useEffect, useRef, useState } from 'react'

interface EditListTitleProps {
	id: string
	initialTitle: string
	onSave: (id: string, newTitle: string) => void
}

export function EditListTitle({
	id,
	initialTitle,
	onSave,
}: EditListTitleProps) {
	const [currentTitle, setCurrentTitle] = useState(initialTitle)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCurrentTitle(event.target.value)
		adjustTextareaHeight()
	}

	const handleSave = () => {
		const trimmedTitle = currentTitle.trim()
		if (trimmedTitle && trimmedTitle !== initialTitle) {
			onSave(id, trimmedTitle)
		} else {
			onSave(id, initialTitle)
		}
	}

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}

	useEffect(() => {
		adjustTextareaHeight()
		if (textareaRef.current) {
			textareaRef.current.focus()
			textareaRef.current.select()
		}
	}, [])

	return (
		<textarea
			ref={textareaRef}
			className='p-1  font-semibold w-full resize-none overflow-hidden'
			value={currentTitle}
			onChange={handleInputChange}
			onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
				if (event.key === 'Enter' && !event.shiftKey) {
					event.preventDefault()
					handleSave()
				}
			}}
			onBlur={handleSave}
			rows={1}
		/>
	)
}
