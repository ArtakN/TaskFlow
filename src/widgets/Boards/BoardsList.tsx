import { Board } from '@/entities/boards/model/types'
import { BoardCard } from '@/entities/boards/ui/BoardCard'
import { openBoardFeature } from '@/features/open-board'

interface BoardsListProps {
	boards: Board[]
}

function BoardsList({ boards }: BoardsListProps) {
	const handleClick = (id: string, title: string): void => {
		openBoardFeature(id, title)
	}

	return (
		<div className='flex flex-wrap gap-4 ml-4'>
			{boards.map(board => (
				<BoardCard
					key={board.id}
					board={board}
					onClick={() => handleClick(board.id, board.title)}
				/>
			))}
		</div>
	)
}

export default BoardsList

/**
 * В целом, этот код делает следующее:
 *
 * Получает массив объектов boards из boards page через props.
 * Перебирает этот массив с помощью map.
 * Для каждого объекта board создает компонент BoardCard и передает ему этот загаловок board и оббработчик собитии в качестве props.
 * Отображает все созданные компоненты BoardCard внутри <div>.
 */
