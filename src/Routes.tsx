import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import { Home } from "./pages/Home"
import { Login } from "./pages/login"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                } />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

const RequireAuth = ({ children }: {children: JSX.Element}) => {
    const { user } = useAuth()
    const location = useLocation()

    if(!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
    
    return children
}