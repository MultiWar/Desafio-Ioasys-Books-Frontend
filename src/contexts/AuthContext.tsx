import React, { createContext, ReactNode, useEffect, useState } from "react"
import api from "../services/api"

type User = {
    name: string,
    accessToken: string
}

type SignInProps = {
    email: string,
    password: string
}

type AuthContextType = {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    signIn: (props: SignInProps) => Promise<void>,
    signOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<User>(JSON.parse(localStorage.getItem('Ioasys_Books-loggedUser')))

    useEffect(() => {
        api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('Ioasys_Books-loggedUser'))?.accessToken}`
    }, [user])
    
    async function signIn({email, password}: SignInProps) {
        const { data, status, headers } = await api.post('/auth/sign-in', { email, password })
        if(status !== 200) {
            throw new Error('Email e/ou senha incorretos.')
        }

        setUser({ name: data.name, accessToken: headers['authorization'] })

        localStorage.setItem('Ioasys_Books-loggedUser', JSON.stringify({name: data.name, accessToken: headers['authorization']}))
        
        api.defaults.headers.common['Authorization'] = `Bearer ${headers['authorization']}`
    }

    function signOut() {
        setUser(undefined)
        localStorage.removeItem('Ioasys_Books-loggedUser')
    }
    
    return (
        <AuthContext.Provider value={{user, setUser, signIn, signOut}}>
            {children}
        </AuthContext.Provider> 
    )
}