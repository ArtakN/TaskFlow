import { AboutPage } from '@/pages/about/AboutPage'
import { Header } from '@/widgets/header/Header'
import { BoardPage } from '@pages/board/BoardPage'
import { BoardsPage } from '@pages/board/BoardsPage'
import { Login } from '@pages/login/Login'
import { NotFoundPage } from '@pages/not-found/NotFoundPage'
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
					<Route path='/login' element={<Login />} />
				</Routes>
			</div>
		</>
	)
}
