import { useAuthStore } from '@/entities/user'
import { Navigate } from 'react-router-dom'

interface GuestRouteProps {
	children: React.ReactNode
}

export function GuestRoute({ children }: GuestRouteProps) {
	const user = useAuthStore(state => state.user)
	const isLoading = useAuthStore(state => state.isLoading)

	if (isLoading) return <div>Loading...</div>

	if (user) {
		return <Navigate to='/boards' replace />
	}

	return children
}
