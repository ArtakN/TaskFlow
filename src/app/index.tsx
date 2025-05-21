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
		const unsubscribe = onAuthStateChanged(
			auth,
			(firebaseUser: FirebaseUserType | null) => {
				if (firebaseUser) {
					console.log('Firebase Auth: User is signed in', firebaseUser)
					const appUser: AppUserType = {
						uid: firebaseUser.uid,
						email: firebaseUser.email,
					}
					setUser(appUser)
				} else {
					console.log('Firebase Auth: User is signed out')
					setUser(null)
				}
				setLoading(false)
			}
		)

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
