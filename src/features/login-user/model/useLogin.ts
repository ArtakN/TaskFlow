import { auth } from '@app/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function useLogin() {
	const loginUser = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
			return true
		} catch (error) {
			console.error('Login failed:', error)
			return false
		}
	}

	return { loginUser }
}
