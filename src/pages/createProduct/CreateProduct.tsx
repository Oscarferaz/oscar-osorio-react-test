import { CreateProductForm } from "@/components"
import { Product } from "@/models/product"
import { addProduct } from "@/redux/states"
import { AppStore } from "@/redux/store"
import { newProduct } from "@/services/products/product"
import { setLocalStorage } from "@/utilities"
import { useSelector, useDispatch } from "react-redux"


const CreateProduct = () => {

    const stateProducts = useSelector((store: AppStore) => store.products)
    const dispatch = useDispatch()

    const onSave = async (data: Product) => {
        const {id, title, price, description, image} = data
        const formData = new FormData()
        formData.append('name', title)
        formData.append('description', description)
        formData.append('price', String(price))
        formData.append('id', String(id))
        formData.append('image', image)
        await newProduct(formData)
        dispatch(addProduct([...stateProducts, data]))
        setLocalStorage(String(id), image)
    }

    return(
        <CreateProductForm onSave={onSave}/>
    )
}


export default CreateProduct
