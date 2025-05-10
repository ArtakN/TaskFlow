import { useEffect, useRef, useState } from 'react'

interface EditableTaskTextProps {
	taskId: string
	initialText: string
	onSave: (taskId: string, newText: string) => void
}

export function EditableTaskText({
	taskId,
	initialText,
	onSave,
}: EditableTaskTextProps) {
	const [currentText, setCurrentText] = useState(initialText)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCurrentText(event.target.value)
		adjustTextareaHeight()
	}

	const handleSave = () => {
		const trimmedTitle = currentText.trim()
		if (trimmedTitle && trimmedTitle !== initialText) {
			onSave(taskId, trimmedTitle)
		} else {
			onSave(taskId, initialText)
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
			className='p-1 rounded-md border py-2 px-3 border-gray-400 font-semibold w-full resize-none overflow-hidden'
			value={currentText}
			onChange={handleInputChange}
			onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
				if (event.key === 'Enter' && !event.shiftKey) {
					event.preventDefault()
					handleSave()
				}
			}}
			onBlur={handleSave}
			rows={1}
		></textarea>
	)
}
