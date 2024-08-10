import { LoginForm } from "./components/loginForm"

export type LoginProps = {
	// types...
}

const Login: React.FC<LoginProps> = () => {
    return(
        <div className='container-flex'>
             <LoginForm/>
        </div>
       
    )
}

export default Login