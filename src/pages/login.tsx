import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useSetUserCookie } from "../hooks/useManageCookies"

export const Login = () => {
    const navigate = useNavigate()
    const location = useLocation() as any
    const { user, signIn } = useAuth()

    const from = location?.state?.from?.pathname || '/'

    if(user) {
        navigate('/')
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const signInProps = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        try {
            signIn(signInProps)
            navigate(from, { replace: true })
        } catch(error) {
            alert(error)
        }
    }

    return (
        <h1>Login</h1>
    )
}