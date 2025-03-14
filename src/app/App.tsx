import BoardsPage from '@/pages/boards/BoardsPage'
import NotFoundPage from '@/pages/not-found/NotFoundPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<BoardsPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
