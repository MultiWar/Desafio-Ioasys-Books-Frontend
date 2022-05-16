import styles from './styles.module.scss'

interface IconButtonProps {
    icon: JSX.Element | string,
    onClick: VoidFunction,
    disabled?: boolean
}

export const IconButton = ({ icon, onClick, disabled = false }: IconButtonProps) => {
    return (
        <button className={styles.button} type='button' onClick={onClick} disabled={disabled}>{icon}</button>
    )
}