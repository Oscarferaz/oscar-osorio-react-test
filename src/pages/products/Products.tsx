import { useNavigate } from "react-router-dom"
import { Navbar } from "./components/navbar"
import { TableProducts } from "./components/tableProducts"

const Products = () => {
    const navigate = useNavigate()

    return(
        <>
            <Navbar>
                <button onClick={() => navigate('/users')}>usuarios</button>
            </Navbar>
            <div className="container-flex">
               <TableProducts/> 
            </div>
        </>
    )
}

export default Products