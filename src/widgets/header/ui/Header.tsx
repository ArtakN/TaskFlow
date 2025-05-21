import { useAuthStore } from '@/entities/user'
import { useLogout } from '@/features/logout-user'
import { SquareCheckBig } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export function Header() {
	const user = useAuthStore(state => state.user)
	const { logoutUser } = useLogout()
	const navigate = useNavigate()

	async function handleLogout() {
		try {
			const success = await logoutUser()
			if (success) {
				navigate('/')
			} else {
				console.warn('Logout was not fully successful according to hook.')
			}
		} catch (error) {
			console.error('Error during logout process in Header:', error)
		}
	}

	return (
		<header className='h-12 flex justify-between items-center border-b-1 border-gray-600 px-4 text-[#9DADBE] fixed bg-[#1c2126] w-full z-10'>
			<Link to='/'>
				<div className='flex items-center gap-2 hover:text-white cursor-pointer transition-all duration-200'>
					<SquareCheckBig size={20} strokeWidth={3} color='currentColor' />
					<p className='text-lg font-bold'>TaskFlow</p>
				</div>
			</Link>
			<div className='flex items-center gap-6 font-semibold'>
				<nav className='flex items-center gap-6'>
					<Link to='/'>
						<div className='hover:text-white cursor-pointer transition-all duration-200'>
							Home
						</div>
					</Link>
					<Link to='/about'>
						<div className='hover:text-white cursor-pointer transition-all duration-200'>
							About
						</div>
					</Link>
				</nav>
				{!user ? (
					<div className='flex items-center gap-6'>
						<Link to='/login'>
							<div className='hover:text-white cursor-pointer transition-all duration-200'>
								Login
							</div>
						</Link>
						<Link to='/registration'>
							<button className='bg-[#4D95FF] px-4 py-1 text-black rounded-sm hover:bg-[#4d94ffd1] cursor-pointer transition-all duration-200'>
								Join for free
							</button>
						</Link>
					</div>
				) : (
					<div
						className='hover:text-white cursor-pointer transition-all duration-200'
						onClick={handleLogout}
					>
						Log out
					</div>
				)}
			</div>
		</header>
	)
}
