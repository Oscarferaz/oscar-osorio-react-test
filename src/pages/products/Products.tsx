import { useNavigate } from "react-router-dom"
import { TableProducts, Navbar, DropDownHeader } from "./components"

const Products = () => {
    const navigate = useNavigate()

    return(
        <>
            <Navbar>
                {/* <button onClick={() => navigate('/users')}>usuarios</button> */}
                <DropDownHeader/>
            </Navbar>
            <div className="container-flex">
               <TableProducts/> 
            </div>
        </>
    )
}

export default Products