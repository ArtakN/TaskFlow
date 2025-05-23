import { useEffect, useRef, useState } from 'react'

interface EditBoardTitleProps {
	onSave: (id: string, title: string) => void
	initialTitle: string
	id: string
}

export function EditBoardTitle({
	onSave,
	initialTitle,
	id,
}: EditBoardTitleProps) {
	const [currentTitle, setCurrentTitle] = useState(initialTitle)
	const spanRef = useRef<HTMLSpanElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const isFirstRender = useRef(true)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentTitle(event.target.value)
	}

	const handleSave = () => {
		const trimmedTitle = currentTitle.trim()

		if (trimmedTitle && trimmedTitle !== initialTitle) {
			onSave(id, trimmedTitle)
		} else {
			onSave(id, initialTitle)
		}
	}

	useEffect(() => {
		if (spanRef.current && inputRef.current) {
			const width = spanRef.current.offsetWidth
			inputRef.current.style.width = `${width + 4}px`
			if (isFirstRender.current) {
				inputRef.current.focus()
				inputRef.current.select()
				isFirstRender.current = false
			}
		}
	}, [currentTitle])

	return (
		<>
			<input
				ref={inputRef}
				type='text'
				onChange={handleInputChange}
				value={currentTitle}
				onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
					if (event.key === 'Enter') {
						handleSave()
					}
				}}
				onBlur={handleSave}
				autoFocus
				className='px-2 text-2xl font-semibold border h-8 rounded-sm'
			/>
			<span
				ref={spanRef}
				className='invisible absolute whitespace-pre'
				style={{
					paddingLeft: '8px',
					paddingRight: '8px',
					fontSize: '24px',
					fontWeight: '600',
				}}
			>
				{currentTitle || ' '}
			</span>
		</>
	)
}
