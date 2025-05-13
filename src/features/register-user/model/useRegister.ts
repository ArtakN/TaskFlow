import { auth } from '@app/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export function useRegister() {
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
			console.log('User registered successfully:', userCredential.user)

			return true
		} catch (error) {
			console.error('Error during registration:', error)
			return false
		}
	}
	return { registerUser }
}
