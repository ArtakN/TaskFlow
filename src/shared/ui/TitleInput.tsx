import { useEffect, useRef } from 'react'
interface TitleInputProps {
	onChange: (value: string) => void
}

export function TitleInput({ onChange }: TitleInputProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(event.target.value)
		adjustTextareaHeight()
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
			placeholder='Enter a text'
			className='w-full px-3 border h-12 rounded-md mt-2 py-2'
			onChange={handleInputChange}
		></textarea>
	)
}
