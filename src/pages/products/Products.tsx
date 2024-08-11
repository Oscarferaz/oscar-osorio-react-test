import { Navbar } from "./components/navbar"
import { TableProducts } from "./components/tableProducts"

const Products = () => {
    return(
        <>
            <Navbar>
                <button>usuarios</button>
            </Navbar>
            <div className="container-flex">
               <TableProducts/> 
            </div>
        </>
    )
}

export default Products