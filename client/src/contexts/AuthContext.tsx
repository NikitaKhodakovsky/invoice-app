import { createContext, ReactNode, useState, useEffect } from 'react'

import { useMeQuery } from '../graphql/queries'

export interface AuthData {
	auth?: boolean
	setAuth: (auth: boolean) => void
}

export const AuthContext = createContext<AuthData>({
	setAuth: () => {}
})

export function AuthProvider({ children }: { children: ReactNode }) {
	const prevAuth = localStorage.getItem('auth')

	const [auth, setAuthState] = useState<boolean>(prevAuth === 'true')

	const { data, error } = useMeQuery()

	function setAuth(auth: boolean) {
		if (auth) {
			localStorage.setItem('auth', 'true')
			setAuthState(true)
		} else {
			localStorage.removeItem('auth')
			setAuthState(false)
		}
	}

	useEffect(() => {
		if (error) {
			setAuth(false)
		}

		if (data && data.me) {
			setAuth(true)
		}
	}, [error, data])

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}
