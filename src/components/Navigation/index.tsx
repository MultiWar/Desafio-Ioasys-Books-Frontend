import { IconButton } from "../IconButton"
import PreviousIcon from '../../assets/previous-icon.svg'
import NextIcon from '../../assets/next-icon.svg'
import styles from './styles.module.scss'

interface NavigationProps {
    currentPage: number,
    totalPages: number,
    previousPage: VoidFunction,
    nextPage: VoidFunction
}

export const Navigation = ({ currentPage, totalPages, previousPage, nextPage }: NavigationProps) => {
    return (
        <div className={styles.navContainer}>
            <span>Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong></span>
            <IconButton icon={<img src={PreviousIcon} />} onClick={previousPage} disabled={currentPage === 1} />
            <IconButton icon={<img src={NextIcon} />} onClick={nextPage} disabled={currentPage === totalPages} />
        </div>
    )
}