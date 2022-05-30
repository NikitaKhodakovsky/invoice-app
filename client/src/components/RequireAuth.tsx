import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks'

export function RequireAuth() {
	const { auth } = useAuth()

	if (!auth) {
		return <Navigate to='/login' replace />
	}

	return <Outlet />
}
