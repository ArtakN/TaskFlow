import { auth } from '@/app/firebase/config'
import { useAuthStore } from '@/entities/user'
import { signOut } from 'firebase/auth'

export function useLogout() {
	const setUser = useAuthStore(state => state.setUser)

	const logoutUser = async () => {
		try {
			await signOut(auth)
			setUser(null)
			return true
		} catch (error) {
			console.log('Logout failed:', error)
			return false
		}
	}
	return { logoutUser }
}
