import { Link } from 'react-router-dom'

const NotFoundPage = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-center w-screen gap-4'>
			<h1 className='text-7xl font-bold text-gray-600'>404</h1>
			<p className='text-2xl text-gray-600'>Oops! Page not found.</p>
			<Link to='/' className='mt-4 text-blue-500 hover:underline'>
				Go back to Home
			</Link>
		</div>
	)
}

export default NotFoundPage
