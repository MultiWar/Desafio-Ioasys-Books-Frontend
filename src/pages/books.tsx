import { useEffect, useState } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { BookCard } from "../components/BookCard"
import { Header } from "../components/Header"
import { Navigation } from "../components/Navigation"
import api from "../services/api"
import styles from '../styles/books.module.scss'

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

interface BooksResponse {
    data: Book[],
    page: number,
    totalItems: number,
    totalPages: number
} 

export const Books = () => {
    const location = useLocation()
    
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || 1

    const [booksResponse, setBooksResponse] = useState<BooksResponse>()

    useEffect(() => {
        try {
            api.get(`/books?page=${page}&amount=12`).then(({data}) => {
                setBooksResponse(data)
            })
        } catch(error) {
            alert('Houve algo de errado com a requisição, tente novamente mais tarde.')
        }
    }, [page])

    function nextPage() {
        setSearchParams({ page: String(Number(page) + 1) })
    }

    function previousPage() {
        setSearchParams({ page: String(Number(page) - 1) })
    }

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.grid}>
                {booksResponse?.data.map(book => (
                    <Link key={book.id} to={`/books/${book.id}`} state={{ backgroundLocation: location, selectedBook: book }}>
                        <BookCard book={book} />
                    </Link>
                ))}
            </main>
            <footer>
                <Navigation 
                    currentPage={Number(page)} 
                    totalPages={Math.ceil(Number(booksResponse?.totalPages)) || 1} 
                    previousPage={previousPage} 
                    nextPage={nextPage}
                />
            </footer>
        </div>
    )
}