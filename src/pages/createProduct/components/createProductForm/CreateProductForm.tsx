import { Product } from "@/models/product"
import { useState } from "react"
import styles from './css/CreateProductForm.module.scss'


const CreateProduct = ({
    initProduct = {
      id: 0,
      title: '',
      price: 0,
      description: '',
      image: ''
    },
    onSave
  }: { initProduct?: Product, onSave: (product: Product) => void  }) => {
  
   
    const [product, setProduct] = useState<Product>(initProduct)

    const [error, setError] = useState<boolean>(false)

    const {id, title, price, description, image} = product

    const handleChange = (ev:  React.ChangeEvent<HTMLInputElement>) => {
        const input = ev.target.name
        const value = ev.target.value
        setProduct ({
            ...product,
            [input]: value
        })
    }

      // Handle image file change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            const imageDataUrl = reader.result as string
            setProduct(prevProduct => ({
            ...prevProduct,
            image: imageDataUrl
            }))
        }

        reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(notValidateForm()){
            setError(true)
        }else{
            try{
                await onSave(product)
                alert('Guardado con exito')
            }catch(e){
                console.log(e)
                alert('Error al crear el producto')
            }
            
        }
    }

      // Validate form inputs
  const notValidateForm = () => {
        let error: boolean = false
        if (title === '') error = true
        if (description === '') error = true 
        if (price === 0 || isNaN(Number(price)))error = true
        if (id === 0 || isNaN(Number(price))) error = true
        if (image === '') error = true 

        return error
    }

    return(
        <form onSubmit={handleSubmit}> 
            <label htmlFor="id">Id:</label>
            <input
                id="id"
                name="id"
                type="number"
                value={id}
                onChange={handleChange}
            />

            <label htmlFor="title">Nombre:</label>
            <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={handleChange}
            />

            <label htmlFor="price">Precio:</label>
            <input
                id="price"
                name="price"
                type="text"
                value={price}
                onChange={handleChange}
            />

            <label htmlFor="description">Descripcion:</label>
            <input
                id="description"
                name="description"
                type="text"
                value={description}
                onChange={handleChange}
            />

            <label htmlFor="image">Imagen:</label>
            <input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
            />
            <button type="submit">Guardar</button>
            {error && <p className={styles.error}>Faltan campos por llenar</p> }
       </form> 
       
    )
}

export default CreateProduct