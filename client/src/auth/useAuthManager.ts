import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuthManager() {
	return useContext(AuthContext)
}
