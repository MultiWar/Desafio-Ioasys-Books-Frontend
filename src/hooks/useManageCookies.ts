import { useCookies } from "react-cookie"

const [_, setCookies, removeCookies] = useCookies()

export const useSetUserCookie = (name: string, accessToken: string) => {
    setCookies('Ioasys_Books-loggedUser', name, {path: '/'})
    setCookies('Ioasys_Books-accessToken', accessToken, {path: '/'})
}

export const useClearCookies = () => {
    removeCookies('Ioasys_Books-loggedUser')
    removeCookies('Ioasys_Books-accessToken')
}