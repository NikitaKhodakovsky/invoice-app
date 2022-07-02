import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth'

export function RequireAuth() {
	const location = useLocation()
	const { auth } = useAuth()

	if (!auth) {
		return <Navigate to='/login' state={{ prevPath: location.pathname }} replace />
	}

	return <Outlet />
}
