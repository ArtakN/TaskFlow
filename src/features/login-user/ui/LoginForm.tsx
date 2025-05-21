import { useLogin } from '@/features/login-user'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginForm() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { loginUser } = useLogin()
	const navigate = useNavigate()

	async function handleLoginUser(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!email || !password) {
			alert('Please enter email and password')
			return
		}

		try {
			const success = await loginUser(email, password)
			if (success) {
				navigate('/')
			} else {
				alert('Login failed')
			}
		} catch (error) {
			console.error('Login failed:', error)
		}
	}

	return (
		<div className='w-md mx-auto mt-40 flex flex-col gap-10 items-center justify-center '>
			<h1 className='text-2xl font-bold'>Log in</h1>
			<form className='flex flex-col gap-6 w-full ' onSubmit={handleLoginUser}>
				<input
					type='email'
					placeholder='Email'
					className=' h-10 border-2 rounded-sm px-2 focus:border-gray-300'
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>
				<input
					type='password'
					minLength={6}
					placeholder='Password'
					className=' h-10 focus:border-gray-300 border-2 rounded-sm px-2'
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>
				<button
					type='submit'
					className='border h-10 bg-[#4D95FF] hover:bg-[#4d94ffd1] transition-all duration-200 text-black rounded-sm cursor-pointer font-bold'
				>
					Log in
				</button>
			</form>
		</div>
	)
}
