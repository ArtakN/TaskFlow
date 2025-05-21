import { auth } from '@/app/firebase/config'
import { signOut } from 'firebase/auth'

export function useLogout() {
	const logoutUser = async () => {
		try {
			await signOut(auth)
			console.log('User signed out successfully.')
			return true
		} catch (error) {
			console.log('Logout failed:', error)
			return false
		}
	}
	return { logoutUser }
}
