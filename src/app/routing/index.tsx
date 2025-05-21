import { Header } from '@/widgets/header'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

const BoardsPage = lazy(() =>
	import('@pages/boards-page').then(module => ({ default: module.BoardsPage }))
)
const BoardPage = lazy(() =>
	import('@pages/board-page').then(module => ({ default: module.BoardPage }))
)
const AboutPage = lazy(() =>
	import('@pages/about-page').then(module => ({ default: module.AboutPage }))
)
const LoginPage = lazy(() =>
	import('@pages/login-page').then(module => ({ default: module.LoginPage }))
)
const RegistrationPage = lazy(() =>
	import('@pages/registration-page').then(module => ({
		default: module.RegistrationPage,
	}))
)
const NotFoundPage = lazy(() =>
	import('@pages/not-found-page').then(module => ({
		default: module.NotFoundPage,
	}))
)

const PageLoader = () => (
	<div className='flex justify-center items-center h-[calc(100vh-4rem)]'>
		<p>Loading page...</p>
	</div>
)

export const AppRouter = () => {
	return (
		<>
			<Header />
			<div className='px-4 pt-16'>
				<Suspense fallback={<PageLoader />}>
					<Routes>
						<Route
							path='/'
							element={
								<ProtectedRoute>
									<BoardsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/boards'
							element={
								<ProtectedRoute>
									<BoardsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/board/:id'
							element={
								<ProtectedRoute>
									<BoardPage />
								</ProtectedRoute>
							}
						/>
						<Route path='*' element={<NotFoundPage />} />
						<Route path='/about' element={<AboutPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/registration' element={<RegistrationPage />} />
					</Routes>
				</Suspense>
			</div>
		</>
	)
}
