interface TitleInputProps {
	onChange: (value: string) => void
}

export function TitleInput({ onChange }: TitleInputProps) {
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
			/>
		</div>
	)
}
