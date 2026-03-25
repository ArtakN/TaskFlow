import { auth } from '@app/firebase/config'
import { useAuthStore } from '@/entities/user'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function useLogin() {
	const setUser = useAuthStore(state => state.setUser)

	const loginUser = async (email: string, password: string) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			setUser({
				uid: userCredential.user.uid,
				email: userCredential.user.email,
			})
			return true
		} catch (error) {
			console.error('Login failed:', error)
			return false
		}
	}

	return { loginUser }
}
