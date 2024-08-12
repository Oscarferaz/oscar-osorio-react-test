import { Product } from "@/models/product"
import { AppStore } from "@/redux/store"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from './css/ProductDetailForm.module.scss'

const ProductDetailsCard = () => {
    const { id } = useParams();
    const stateProducts = useSelector((store: AppStore) => store.products)

    const details: Product | null | undefined = id 
    ? stateProducts.find(p => String(p.id) === String(id))
    : null;
    
    return(
        details ? (
            <div className={styles.card}>
                <img className={styles.image} src={details.image} alt={details.title} />
                <div className={styles.content}>
                    <h2 className={styles.title}>{details.title}</h2>
                    <p className={styles.price}>Precio: ${details.price}</p>
                    <p className={styles.description}>Descripción: {details.description}</p>
                </div>
            </div>
        ) : (
            <p>Producto no encontrado.</p>
        )
        
    )
}

export default ProductDetailsCard