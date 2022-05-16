import { useAuth } from "../../hooks/useAuth"
import { IconButton } from "../IconButton"
import Logo from '../../assets/black-logo.svg'
import LogoutIcon from '../../assets/logout-icon.svg'
import styles from './styles.module.scss'

export const Header = () => {
    const { user, signOut } = useAuth()
    return (
        <header className={styles.header}>
            <div>
                <img src={Logo} />
                <span>Books</span>
            </div>
            <div>
                <span>Bem vindo, <strong>{user.name}</strong></span>
                <IconButton icon={<img src={LogoutIcon} />} onClick={signOut} />
            </div>
        </header>
    )
}