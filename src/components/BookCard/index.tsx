import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

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

interface BookCardProps {
    book: Book
}

export const BookCard = ({ book }: BookCardProps) => {
    return (
        <div className={styles.container}>
            <img src={book.imageUrl} />
            <div>
                <div>
                    <h3>{book.title}</h3>
                    {book.authors.map(a => (
                        <p key={a}>{a}</p>
                    ))}
                </div>
                <div>
                    <span>{book.pageCount} páginas</span>
                    <span>Editora {book.publisher}</span>
                    <span>Publicado em {book.published}</span>
                </div>
            </div>
        </div>
    )
}