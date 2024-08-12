import { TableProducts, Navbar, DropDownHeader } from "./components"

const Products = () => {

    return(
        <>
            <Navbar>
                <DropDownHeader/>
            </Navbar>
            <div className="container-flex">
               <TableProducts/> 
            </div>
        </>
    )
}

export default Products