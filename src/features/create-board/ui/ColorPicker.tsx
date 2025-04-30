import { Color } from '@/entities/board'
interface ColorPickerProps {
	colors: Color[]
	selectedColor: string
	onSelect: (color: string) => void
}

export function ColorPicker({
	colors,
	selectedColor,
	onSelect,
}: ColorPickerProps) {
	return (
		<div className='flex flex-wrap justify-between gap-2'>
			{colors.map(color => (
				<div
					onClick={() => onSelect(color.title)}
					className='w-21 h-10 rounded-sm cursor-pointer'
					key={color.id}
					style={{
						backgroundColor: color.title,
						border:
							selectedColor === color.title ? '3px solid #fff' : undefined,
					}}
				></div>
			))}
		</div>
	)
}
