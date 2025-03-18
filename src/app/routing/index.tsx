import BoardPage from '@pages/board/BoardPage'
import BoardsPage from '@pages/board/BoardsPage'
import NotFoundPage from '@pages/not-found/NotFoundPage'
import { Route, Routes } from 'react-router-dom'

export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<BoardsPage />} />
			<Route path='/boards' element={<BoardsPage />} />
			<Route path='/board/:id' element={<BoardPage />} />
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	)
}
