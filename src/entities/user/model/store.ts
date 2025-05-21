import { create } from 'zustand'
import { User } from './types'
interface AuthState {
	user: User | null

	isLoading: boolean

	setUser: (user: User | null) => void

	setLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthState>()(set => ({
	user: null,

	isLoading: true,

	setUser: (user: User | null) =>
		set(state => ({
			...state,
			user,
		})),

	setLoading: (isLoading: boolean) =>
		set(state => ({
			...state,
			isLoading,
		})),
}))
