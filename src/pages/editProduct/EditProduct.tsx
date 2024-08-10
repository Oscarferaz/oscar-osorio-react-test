import { CreateProductForm } from "@/components"
import { Product } from "@/models/product"
import { updateProduct } from "@/redux/states"
import { AppStore } from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const EditProduct = () => {

    const {id} = useParams()

    const dispatch = useDispatch()

    const stateProducts = useSelector((store: AppStore) => store.products )

    const [product, setProduct] = useState<Product | null>(null)
    
    useEffect(() => {
        const findProduct = stateProducts.find((product: Product) => String(product.id) === String(id))
        if(findProduct) setProduct(findProduct)
            console.log(findProduct)
    }, [id])

    const onSave = (data: Product) => {
        const products = [...stateProducts]
        const {id} = data
        const index = products.findIndex(product => String(product.id) === String(id))
        if (index === -1) return
        products[index] = data
        dispatch(updateProduct(products))
    }

    return(
        
        product
        ? <div className="container-flex"><CreateProductForm initProduct={product} onSave={onSave}/></div>
        : null
        
        
    )
}

export default EditProduct