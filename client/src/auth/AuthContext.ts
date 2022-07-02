import { Context, createContext } from 'react'
import { AuthManager } from './AuthManager'

const defaultAuthManager = new AuthManager()

export const AuthContext: Context<AuthManager> = createContext(defaultAuthManager)
