import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import { BookModal } from "./pages/bookModal"
import { Books } from "./pages/books"
import { Login } from "./pages/login"
import api from "./services/api"

type Book = {
    id: string,
    title: string,
    description: string,
    authors: string[],
    pageCount: number,
    category: string,
    imageUrl: string,
    isbn10: string,
    isbn13: string,
    language: string,
    publisher: string,
    published: number
}

export const Router = () => {
    const location = useLocation()

    const state = location.state as {backgroundLocation?: Location, selectedBook?: Book}

    return (
        <div>
             {/* <BrowserRouter> */}
            <Routes location={state?.backgroundLocation || location}>
                <Route path='/' element={<Login />} />
                <Route path='/books' element={
                    <RequireAuth>
                        <Books />
                    </RequireAuth>
                }>
                </Route>
            </Routes>
        {/* // </BrowserRouter> */}
            
            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/books/:bookId" element={<BookModal book={state?.selectedBook} />} />
                </Routes>
            )}
        </div>
    )
}

const RequireAuth = ({ children }: {children: JSX.Element}) => {
    const { user } = useAuth()
    const location = useLocation()

    if(!user) {
        return <Navigate to='/' state={{ from: location }} replace />
    }

    
    
    return children
}