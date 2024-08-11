import { getLocalStorage, setLocalStorage} from "@/utilities";
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "@/redux/states";
import { UserForm } from "@/components";
import { User } from "@/models/user";



const ChangeUserData = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [, , removeCookie] = useCookies(['auth'])


    const validateForm = (data: User) => {
        const { password } = data
        const passwordLocalStorage = getLocalStorage('password')
        if(password !== passwordLocalStorage) return 'Contraseña incorrecta'
    }
   

    const handleSubmit = (data: User) => {
        const {email} = data
        setLocalStorage('username', email)
        removeCookie('auth')
        dispatch(logout())
        navigate('/login')
    }

    return(
        <UserForm onClick={handleSubmit} validationOnSubmit={validateForm}/>
    )
}

export default ChangeUserData