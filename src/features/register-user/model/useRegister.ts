import { auth } from '@app/firebase/config'
import { useAuthStore } from '@/entities/user'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export function useRegister() {
	const setUser = useAuthStore(state => state.setUser)

	const registerUser = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

			setUser({
				uid: userCredential.user.uid,
				email: userCredential.user.email,
			})

			return true
		} catch (error) {
			console.error('Error during registration:', error)
			return false
		}
	}
	return { registerUser }
}
