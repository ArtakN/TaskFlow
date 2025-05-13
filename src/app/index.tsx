import { auth } from '@app/firebase/config'
import { AppRouter } from '@app/routing'
import { useAuthStore, type User as AppUserType } from '@entities/user'
import {
	onAuthStateChanged,
	type User as FirebaseUserType,
} from 'firebase/auth'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

export function App() {
	const setUser = useAuthStore(state => state.setUser)
	const setLoading = useAuthStore(state => state.setLoading)

	useEffect(() => {
		// onAuthStateChanged вызывается при инициализации и каждый раз,
		// когда пользователь входит или выходит.
		// Она возвращает функцию отписки (unsubscribe).
		const unsubscribe = onAuthStateChanged(
			auth,
			(firebaseUser: FirebaseUserType | null) => {
				if (firebaseUser) {
					// Пользователь залогинен или только что залогинился
					console.log('Firebase Auth: User is signed in', firebaseUser)
					const appUser: AppUserType = {
						// Создаем объект нашего типа User
						uid: firebaseUser.uid,
						email: firebaseUser.email,
					}
					setUser(appUser)
				} else {
					// Пользователь не залогинен или вышел
					console.log('Firebase Auth: User is signed out')
					setUser(null)
				}
				// В любом случае (пользователь есть или нет), первоначальная проверка завершена
				setLoading(false)
			}
		)

		// Функция очистки: будет вызвана, когда компонент App размонтируется
		// (в SPA это обычно при закрытии вкладки, но это хорошая практика)
		return () => {
			console.log('Firebase Auth: Unsubscribing auth listener')
			unsubscribe()
		}
	}, [setUser, setLoading])

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}
