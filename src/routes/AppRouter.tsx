

import { Login, Users, NotFoundPage, Products, CreateProduct, ProductDetails, EditProduct } from "@/pages"
import { Route, HashRouter, Routes, Navigate } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import { useCookies } from "react-cookie"
import { AppStore } from "@/redux/store"
import { useSelector } from "react-redux"

const AppRouter = () => {

    const [cookies] = useCookies(['auth'])
    const isAuthenticated = useSelector((state: AppStore) => state.auth.isAuthenticated) || cookies.auth;


    return(
        <HashRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/products" />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/products" /> : <Login />}/>
                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/products/create" element={<CreateProduct/>}/>
                    <Route path="/products/:id" element={<ProductDetails/>}/>
                    <Route path="/edit/:id" element={<EditProduct/>}/>
                </Route>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </HashRouter>
    )
}

export default AppRouter