import { logout } from "@/redux/states"
import { faUser, faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Dropdown } from "rsuite"


const DropdownHeader: React.FC = () => {

    const dispatch = useDispatch()
    const [, , removeCookie] = useCookies(['auth'])

    const navigate = useNavigate()

    const handleClickUser = () => navigate('/users')

    const handleClickLogout = () => {
        dispatch(logout())
        removeCookie('auth', { path: '/' });
    }


    return(
        <Dropdown title={'configuracion'} trigger={'hover'}  size="md" icon={<FontAwesomeIcon icon={faGear}/>}>
             <Dropdown.Item icon={<FontAwesomeIcon icon={faUser}/>} onClick={handleClickUser}>Usuario</Dropdown.Item>
             <Dropdown.Separator/> 
             <Dropdown.Item onClick={handleClickLogout}>Cerrar sesion</Dropdown.Item>
        </Dropdown>
    )
}

export default DropdownHeader