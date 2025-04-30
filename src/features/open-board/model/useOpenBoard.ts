import { useNavigate } from 'react-router-dom'

export const useOpenBoard = () => {
	const navigate = useNavigate()

	return (id: string): void => {
		navigate(`/board/${id}`)
	}
}
