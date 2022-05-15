import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/login"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

const RequireAuth = ({ children }: {children: React.ReactNode}) => {}