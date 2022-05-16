import Alert from '@reach/alert'
import styles from './styles.module.scss'

interface CustomAlertProps {
    message: string
}

export const CustomAlert = ({ message }: CustomAlertProps) => {
    return (
        <Alert className={styles.alert}>
            {message}
        </Alert>
    )
}