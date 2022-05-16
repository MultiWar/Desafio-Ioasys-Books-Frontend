import styles from './styles.module.scss'

interface CustomInputProps {
    id: string,
    name: string,
    label: string,
    type: "email" | "password",
    button?: JSX.Element
}

export const CustomInput = ({id, name, label, type, button}: CustomInputProps) => {
    return (
        <div className={styles.inputWrapper}>
            <div>
                <label id={`label-${id}`} htmlFor={id}>{label}</label>
                <input id={id} name={name} type={type} aria-labelledby={`label-${id}`} />
            </div>
            {button}
        </div>
    )
}