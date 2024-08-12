import { FieldForm } from "@/components/fieldForm"
import { User } from "@/models/user"
import { Controller, useForm } from "react-hook-form"
import { emailRegex, passwordRegex } from "@/utilities"
import { Button, Form } from "rsuite";
import { useState } from "react";
import styles from './css/UserForm.module.scss'


const defaultValues = {
    email: '',
    password: '',
    confirmPassword: ''
};

interface userForm extends User{
    confirmPassword: string
}

interface PropsUserForm {
    onClick: (data: User) => void
    validationOnSubmit?: (data: User) => string | null | undefined
}

const UserForm: React.FC<PropsUserForm> = ({onClick, validationOnSubmit}) => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm<userForm>({defaultValues, 
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    const [error, setError] = useState<null | String | undefined>(null)

    const onSubmit = (data: User) => {
        if(validationOnSubmit){
            const message = validationOnSubmit(data)
            if(message){
                setError(message)
                return
            }
        }
        onClick(data)
    }

    return(
        <Form>

            <Controller
                name="email"
                control={control}
                rules={{ 
                    required: 'Correo electronico es requerido' ,
                    pattern: { value: emailRegex, message: 'Ingrese un correo valido' }
                }}
                render={({ field }) => (
                <FieldForm field={field} error={errors[field.name]?.message}  label="Correo electonico:"/>
                )}
            />


            <Controller
                name="password"
                control={control}
                rules={{ 
                    required: 'Contraseña es requerida requerido',
                    pattern: { value: passwordRegex, message: `La contraseña debe tener entre 6 y 12 caracteres, con una mayuscula, un numero y un caracter especial`}
                }}
                render={({ field }) => (
                    <FieldForm field={field} error={errors[field.name]?.message}  label="Contaseña:" type="password"/>
                )}
            />

            <Controller
                name="confirmPassword"
                control={control}
                rules={{ 
                    required: 'Contraseña es requerida requerido',
                    validate: (value) => 
                        value === watch('password') || 'Las contraseñas no coinciden'
                }}
                render={({ field }) => (
                    <FieldForm field={field} error={errors[field.name]?.message}  label="Confirmar contraseña:" type="password"/>
                )}
            />

            {
                error && <Form.ControlLabel className={styles.error}>{error} </Form.ControlLabel>
            }

            <Button type="submit" appearance="primary" onClick={handleSubmit(onSubmit)}>
                Ingresar
            </Button>
                
        </Form>
    )
}
export default UserForm