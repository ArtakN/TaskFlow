import { useAuthStore } from '@/entities/user'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
	children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const user = useAuthStore(state => state.user)
	const isLoading = useAuthStore(state => state.isLoading)

	if (isLoading) return <>Loading...</>

	if (!user) return <Navigate to='/login' replace /> // `replace` нужен, чтобы страница, с которой редирект, не попадала в историю браузера

	return children
}
