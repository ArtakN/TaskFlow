import { DeleteBoardMenuItem } from '@/features/delete-board'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'

interface BoardOptionsMenuProps {
	boardId: string
	boardTitle: string
}

export function BoardOptionsMenu({
	boardId,
	boardTitle,
}: BoardOptionsMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='p-1 rounded hover:bg-white/10'>
					<MoreHorizontal size={20} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DeleteBoardMenuItem boardId={boardId} boardTitle={boardTitle} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
