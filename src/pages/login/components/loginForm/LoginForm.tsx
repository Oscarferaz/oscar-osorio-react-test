import { login } from "@/redux/states"
import { getLocalStorage } from "@/utilities"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['auth'])

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    const onchangeMail = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setMail(ev.target.value)
    }

    const onchangePassword = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(ev.target.value)
    }
    

    const handleLogin = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if(mail !== getLocalStorage('username') || password !== getLocalStorage('password')) return
        const date = new Date()
        date.setTime(date.getTime() + (60*60*1000))
        setCookie('auth', true, {path: '/', expires: date})
        dispatch(login(true))
        navigate('/products')
    }

    return(
       <form onSubmit={handleLogin}> 
            <label htmlFor="mail">Correo electronico:</label>
            <input name="mail" type="text" id="mail"  value={mail} onChange={onchangeMail}/>
            <label htmlFor="password">Contraseña:</label>
            <input name="password" type="password" id="password" value={password} onChange={onchangePassword}/>
            <button type="submit">Entrar</button>
       </form>
    )
}
export default LoginForm