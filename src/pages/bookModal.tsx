import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"
import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'
import styles from '../styles/bookModal.module.scss'
import QuotesIcon from '../assets/quotes-icon.svg'

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

export const BookModal = ({ book }: {book?: Book}) => {
    const { bookId } = useParams()
    const [selectedBook, setSelectedBook] = useState(book)
    const navigate = useNavigate()

    useEffect(() => {
        if(!book) {
            try {
                api.get(`/books/${bookId}`).then(({ data }) => setSelectedBook(data))
            } catch(error) {
                alert('Houve algo de errado com a requisição, tente novamente mais tarde')
            }
        }
    }, [])

    function onDismiss() {
        navigate(-1)
    }

    return (
        <Dialog
            onDismiss={onDismiss}
            className={styles.modal}
        >
            <img src={selectedBook?.imageUrl} />
            <div>
                <div className={styles.titleDiv}>
                    <h1>{selectedBook?.title}</h1>
                    {selectedBook?.authors.map((a, i) => (
                        <span key={a}>{i !== 0 && ', '}{a}</span>
                    ))}
                </div>
                <div className={styles.generalInfo}>
                    <h3>Informações</h3>
                    <div>
                        <span>Páginas</span>
                        <span>{selectedBook?.pageCount}</span>
                    </div>
                    <div>
                        <span>Editora</span>
                        <span>{selectedBook?.publisher}</span>
                    </div>
                    <div>
                        <span>Publicação</span>
                        <span>{selectedBook?.published}</span>
                    </div>
                    <div>
                        <span>Idioma</span>
                        <span>{selectedBook?.language}</span>
                    </div>
                    <div>
                        <span>Título Original</span>
                        <span>{selectedBook?.title}</span>
                    </div>
                    <div>
                        <span>ISBN-10</span>
                        <span>{selectedBook?.isbn10}</span>
                    </div>
                    <div>
                        <span>ISBN-13</span>
                        <span>{selectedBook?.isbn13}</span>
                    </div>
                </div>
                <div className={styles.descriptionBox}>
                    <h3>Resenha da editora</h3>
                    <p><img src={QuotesIcon} /> {selectedBook?.description}</p>
                </div>
            </div>
        </Dialog>
    )
}