import { setLocalStorage, validateConfirmPassword, validateEmail, validatePassword } from "@/utilities";
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styles from './css/ChangeUserData.module.scss'
import { logout } from "@/redux/states";



const ChangeUserData = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [, , removeCookie] = useCookies(['auth'])

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errors, setErrors] = useState<{ email: string; password: string; confirmPassword: string }>({
        email: '',
        password: '',
        confirmPassword: '',
      });

    const onchangeMail = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const mail = ev.target.value
        setMail(mail)
        if(!validateEmail(mail)) {
            changeErrors('email', 'Correo electrónico inválido')
        }else{
            changeErrors('email', '')
        }
    }

    const onchangePassword = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const password = ev.target.value
        setPassword(password)
        if(!validatePassword(password)) {
            changeErrors('password', 'La contraseña debe tener entre 6 y 12 caracteres, incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial')    
        }else{
            changeErrors('password', '')
        }
    }

    const onchangeConfirmPassword = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const confirm = ev.target.value
        setConfirmPassword(confirm)
        if(!validateConfirmPassword(confirm, password)) {
            changeErrors('confirmPassword', 'Las contraseñas no coinciden')    
        }else{
            changeErrors('confirmPassword', '')
        }

    }

    const changeErrors = (key: string, value: string) => {
        setErrors((prevErrors) => ({ ...prevErrors, [key]: value }));
    }

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (errors.email || errors.password || errors.confirmPassword) return
        setLocalStorage('username', mail)
        setLocalStorage('password', password)
        removeCookie('auth')
        dispatch(logout())
        navigate('/login')
    }

    return(
        <form onSubmit={handleSubmit} className="form-data"> 
            <label htmlFor="mail">Correo electronico:</label>
            <input name="mail" type="text" id="mail"  value={mail} onChange={(onchangeMail)}/>
            {errors.email && <span className={styles.tooltip}>{errors.email}</span>}

            <label htmlFor="password">Contraseña:</label>
            <input name="password" type="password" id="password" value={password} onChange={onchangePassword} maxLength={12}/>
            {errors.password && <span className={styles.tooltip}>{errors.password}</span>}

            <label htmlFor="confirm">Confirmar contraseña:</label>
            <input name="confirm" type="password" id="confirm" value={confirmPassword} onChange={onchangeConfirmPassword} maxLength={12}/>
            {errors.confirmPassword && <span className={styles.tooltip}>{errors.confirmPassword}</span>}

            <button type="submit">Entrar</button>
        </form>
    )
}

export default ChangeUserData