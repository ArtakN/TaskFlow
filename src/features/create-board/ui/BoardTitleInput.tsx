interface BoardTitleInputProps {
	onChange: (value: string) => void
	boardTitle: string
}

export function BoardTitleInput({
	onChange,
	boardTitle,
}: BoardTitleInputProps) {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value)
	}

	return (
		<div className='mt-2'>
			<input
				type='text'
				placeholder='Enter a title'
				className='w-full pl-3 border h-12 rounded-lg'
				onChange={handleInputChange}
				style={{ borderColor: !boardTitle ? 'red' : '' }}
			/>
		</div>
	)
}
