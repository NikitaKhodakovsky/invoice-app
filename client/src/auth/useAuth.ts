import { useEffect, useState } from 'react'
import { useAuthManager } from './useAuthManager'

export interface UseAuthResult {
	auth: boolean
	setAuth: (auth: boolean) => void
}

export function useAuth(): UseAuthResult {
	const authManager = useAuthManager()
	const [auth, setAuthState] = useState<boolean>(authManager.getAuth())

	useEffect(() => {
		return authManager.subscribe(setAuthState)
	}, [authManager])

	return { auth, setAuth: authManager.setAuth.bind(authManager) }
}
