import { useAuthStore } from '@/entities/user'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
	children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const user = useAuthStore(state => state.user)
	const isLoading = useAuthStore(state => state.isLoading)
	const location = useLocation()

	if (isLoading) return <div>Loading...</div>

	if (!user) {
		return <Navigate to='/login' replace state={{ from: location }} />
	}

	return children
}
