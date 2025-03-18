interface AddTaskCardInputProps {
	setCardInputText: React.Dispatch<React.SetStateAction<string>>
}

function AddTaskCardInput({ setCardInputText }: AddTaskCardInputProps) {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCardInputText(event.target.value)
	}

	return (
		<div className=' '>
			<input
				type='text'
				placeholder='Enter a title'
				className='w-full pb-4 pl-3 border h-15 rounded-lg'
				onChange={handleInputChange}
			/>
		</div>
	)
}

export default AddTaskCardInput
