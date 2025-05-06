import { useDeleteList } from '@/features/delete-list'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'
import { Trash2 } from 'lucide-react'

interface DeleteListMenuItemProps {
	listId: string
	listTitle: string
}

export function DeleteListMenuItem({
	listId,
	listTitle,
}: DeleteListMenuItemProps) {
	const { deleteList } = useDeleteList()

	const handleDeleteClick = () => {
		if (
			window.confirm(
				`Delete list "${listTitle}"? All tasks within it will also be deleted!`
			)
		) {
			deleteList(listId)
		}
	}

	return (
		<DropdownMenuItem onClick={handleDeleteClick} variant='destructive'>
			<Trash2 />
			<span>Delete List</span>
		</DropdownMenuItem>
	)
}
