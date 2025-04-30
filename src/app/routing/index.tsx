import { AboutPage } from '@/pages/about-page'
import { BoardPage } from '@/pages/board-page'
import { BoardsPage } from '@/pages/boards-page'
import { LoginPage } from '@/pages/login-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { Header } from '@/widgets/header'
import { Route, Routes } from 'react-router-dom'

export const AppRouter = () => {
	return (
		<>
			<Header />
			<div className='px-4 pt-16'>
				<Routes>
					<Route path='/' element={<BoardsPage />} />
					<Route path='/boards' element={<BoardsPage />} />
					<Route path='/board/:id' element={<BoardPage />} />
					<Route path='*' element={<NotFoundPage />} />
					<Route path='/about' element={<AboutPage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</div>
		</>
	)
}
