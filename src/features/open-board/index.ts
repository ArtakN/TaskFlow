import { useNavigate } from 'react-router-dom'

export const useOpenBoard = () => {
	const navigate = useNavigate()

	// const toSlug = (title: string): string => {
	// 	return title
	// 		.toLowerCase()
	// 		.replace(/\s+/g, '-') // Заменяем пробелы на дефисы
	// 		.replace(/[^a-z0-9-]/g, '') // Удаляем все, кроме букв, цифр и дефисов
	// }

	return (id: string): void => {
		navigate(`/board/${id}`)
	}
}
