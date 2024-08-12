import { Product } from "@/models/product"
import { Button, Form, Uploader } from "rsuite"
import { Controller, useForm } from "react-hook-form"
import { FieldForm } from "../fieldForm"
import styles from './css/CreateProductForm.module.scss'
import { useState } from "react"

const defaultValues: Product  = {
    id:'',
    title: '',
    price: '',
    description: '',
    image: ''
}

interface PropProductForm {
    initProduct?: Product,
    onSave: (product: Product) => void 
}


const ProductForm: React.FC<PropProductForm> =  ({ initProduct = defaultValues, onSave }) => {
  

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
      } = useForm<Product>({
        defaultValues: initProduct, 
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    const [visibleFieldList, setVisibleFieldList] = useState(false)

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUrl = reader.result as string;
            setValue('image', imageDataUrl);
            setVisibleFieldList(true)
        }
        reader.readAsDataURL(file);
    }

    const onSubmit = async (product: Product) => {
        onSave(product)
        setVisibleFieldList(false)
        reset(defaultValues)
    }

    return(       
        <Form>
            <Controller
                name="id"
                control={control}
                rules={{ 
                    required: 'id es requerido' ,
                }}
                render={({ field }) => (
                    <FieldForm field={field} error={errors[field.name]?.message}  label="Id:" type="number"/>
                )}
            />

            <Controller
                name="title"
                control={control}
                rules={{ 
                    required: 'Nombre es requerido' ,
                }}
                render={({ field }) => (
                    <FieldForm field={field} error={errors[field.name]?.message}  label="Nombre:"/>
                )}
            />

           <Controller
                name="price"
                control={control}
                rules={{ 
                    required: 'Precio es requerido' ,
                }}
                render={({ field }) => (
                    <FieldForm field={field} error={errors[field.name]?.message}  label="Precio:" type="number"/>
                )}
            />

            <Controller
                name="description"
                control={control}
                rules={{ 
                    required: 'Descripcion es requerido' ,
                }}
                render={({ field }) => (
                    <FieldForm field={field} error={errors[field.name]?.message}  label="Descripcion:"/>
                )}
            />

            <Controller
                name="image"
                control={control}
                rules={{ 
                    required: 'Imagen es requerido' ,
                }}
                render={() => (
                    <Form.Group className={styles.width}>
                        <Form.ControlLabel>Imagen:</Form.ControlLabel>
                    <Uploader 
                        action="" 
                        autoUpload={false} 
                        onChange={(fileList) => {
                            if(fileList[0]?.blobFile)  handleImageUpload(fileList[0].blobFile)
                        }}
                        accept="image/*"
                        fileListVisible={visibleFieldList}
                    >
                        <Button>
                            Seleccionar Imagen
                        </Button>
                    </Uploader>
                    {errors.image && (
                            <Form.ErrorMessage show={!!errors.image} placement="bottomStart">
                                {errors.image.message}
                            </Form.ErrorMessage>
                        )}
                    </Form.Group>
                   
                )}
            />

            <Button type="submit" appearance="primary" onClick={handleSubmit(onSubmit)}>
                Ingresar
            </Button>

        </Form>
    )
}

export default ProductForm