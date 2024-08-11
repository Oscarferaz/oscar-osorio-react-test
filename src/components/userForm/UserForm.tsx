import { FieldForm } from "@/components/fieldForm"
import { User } from "@/models/user"
import { Controller, useForm } from "react-hook-form"
import { emailRegex, passwordRegex } from "@/utilities"
import { Button, Form } from "rsuite";


const defaultValues = {
    email: '',
    password: '',
    confirmPassword: ''
};

interface userForm extends User{
    confirmPassword: string
}

interface PropsLoginForm {
    onClick: (data: User) => void
}

const UserForm: React.FC<PropsLoginForm> = ({onClick}) => {

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm<userForm>({defaultValues, 
        mode: 'onChange',
        reValidateMode: 'onChange'
    });
    

    return(
        <Form checkTrigger={"change"}>

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
                    <FieldForm field={field} error={errors[field.name]?.message}  label="Contaseña:"/>
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
                    <FieldForm field={field} error={errors[field.name]?.message}  label="Confirmar contraseña:"/>
                )}
            />

            <Button type="submit" appearance="primary" onClick={handleSubmit(onClick)}>
                Ingresar
            </Button>
                
        </Form>
    )
}
export default UserForm