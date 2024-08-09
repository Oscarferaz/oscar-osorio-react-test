import { AppStore } from "@/redux/store"
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const [cookies] = useCookies(['auth'])
    const isAuthenticated = useSelector((store: AppStore) => store.auth.isAuthenticated) || cookies.auth
    return isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
}

export default PrivateRoute