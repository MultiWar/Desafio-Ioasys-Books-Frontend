import { createContext, ReactNode, useState } from "react"
import { useClearCookies, useSetUserCookie } from "../hooks/useManageCookies"
import api from "../services/api"

type User = {
    name: string,
}

type SignInProps = {
    email: string,
    password: string
}

type AuthContextType = {
    user: User | undefined,
    signIn: (props: SignInProps, callback?: VoidFunction) => Promise<void>,
    signOut: (callback: VoidFunction) => void
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<User>()
    
    async function signIn({email, password}: SignInProps, callback: VoidFunction = () => {}) {
        const { data, status } = await api.post('/auth/sign-in', { email, password })
        if(status !== 200) {
            throw new Error('Email e/ou senha incorretos.')
        }

        setUser({ name: data.name })
        useSetUserCookie(data.name, data.accessToken)
    }

    function signOut(callback: VoidFunction) {
        setUser(undefined)
        useClearCookies()
    }
    
    return (
        <AuthContext.Provider value={{user, signIn, signOut}}>
            {children}
        </AuthContext.Provider> 
    )
}