import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import Logo from '../assets/white-logo.svg'
import { CustomInput } from "../components/Form/Input"
import { CustomButton } from "../components/Form/Button"
import styles from '../styles/login.module.scss'
import { CustomAlert } from "../components/Alert"

export const Login = () => {
    const navigate = useNavigate()
    const location = useLocation() as any
    const { user, signIn } = useAuth()
    const [errorMessage, setErrorMessage] = useState('')

    const from = location?.state?.from?.pathname || '/books'

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const signInProps = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        try {
            await signIn(signInProps)
            navigate(from, { replace: true })
        } catch(error) {
            if(error.response.status === 401) {
                setErrorMessage('Email e/ou senha inválidos.')
            }
        }
    }

    return (
        <div className={styles.wrapper}>
            <main>
                <div>
                    <img src={Logo} alt='Ioasys' />
                    <span>Books</span>
                </div>
                <form onSubmit={onSubmit}>
                    <CustomInput label='Email' id='email' name='email' type='email' />
                    <CustomInput label="Senha" id='password' name='password' type='password' button={
                        <CustomButton label="Entrar" type='submit' />
                    } />
                </form>
                {!!errorMessage && (
                    <CustomAlert message={errorMessage} />
                )}
            </main>
        </div>
    )
}