import { ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import { AuthManager } from "./AuthManager";

export interface AuthProviderProps {
    manager: AuthManager
    children: ReactNode
}

export function AuthProvider({ manager, children }: AuthProviderProps) {
    return <AuthContext.Provider value={manager}>{children}</AuthContext.Provider>
}