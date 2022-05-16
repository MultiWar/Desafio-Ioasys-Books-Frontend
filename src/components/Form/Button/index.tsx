import styles from './styles.module.scss'

interface CustomButtonProps {
    label: string,
    type: "button" | "submit",
    onClick?: VoidFunction
}

export const CustomButton = ({label, type, onClick}: CustomButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick} type={type}>{label}</button>
    )
}