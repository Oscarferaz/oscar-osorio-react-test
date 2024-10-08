import { User } from "@/models/user"
import { login } from "@/redux/states"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getLocalStorage } from "@/utilities"
import { UserForm } from "@/components"


const LoginForm: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [, setCookie] = useCookies(['auth'])
    
    const handleLogin = () => {
        const date = new Date()
        date.setTime(date.getTime() + (60*60*1000))
        setCookie('auth', true, {path: '/', expires: date})
        dispatch(login(true))
        navigate('/products')
    }

    const validateForm = (data: User) => {
        const {email, password} = data
        if(email !== getLocalStorage('username') || password !== getLocalStorage('password')) return 'Credenciales invalidas'
    }

    return(
        <UserForm onClick={handleLogin} validationOnSubmit={validateForm}/>
    )
}
export default LoginForm