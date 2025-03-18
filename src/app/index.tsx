import { AppRouter } from '@app/routing/index'
import { BrowserRouter } from 'react-router-dom'

export function App() {
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}
