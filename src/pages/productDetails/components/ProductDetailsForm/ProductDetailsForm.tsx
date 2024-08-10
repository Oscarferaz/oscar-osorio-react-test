import { Product } from "@/models/product"
import { AppStore } from "@/redux/store"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from './css/ProductDetailForm.module.scss'

const ProductDetailsForm = () => {
    const { id } = useParams();
    const stateProducts = useSelector((store: AppStore) => store.products)

    const details: Product | null | undefined = id 
    ? stateProducts.find(p => String(p.id) === String(id))
    : null;
    
    return(
        details ? (
            <div>
                <h1>{details.title}</h1>
                <p>Precio: ${details.price}</p>
                <p>Descripción: {details.description}</p> 
                <img className={styles.containerImg} src={details.image} alt={details.title} />
            </div>
        ) : null
        
    )
}

export default ProductDetailsForm