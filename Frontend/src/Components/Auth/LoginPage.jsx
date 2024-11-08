import {loginRequest, adminRequest} from './API/auth.js'
import { useAuthStore } from '../../Context/auth.js'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {

    const setToken = useAuthStore(state => state.setToken)
    const setAdmin = useAuthStore(state => state.setAdmin)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = (e.currentTarget.elements[0].value)
        const password = (e.currentTarget.elements[1].value)


        const resLogin = await loginRequest(email, password)
        setToken(resLogin.data.token)

        const resAdmin = await adminRequest()
        setAdmin(resAdmin.data.admin)
 
        navigate('/admin')
    }
    
  return (
    <form onSubmit={handleSubmit}>
        <input type='email' placeholder='nombre@email.com'/>
        <input type="password" placeholder='*****'/>
        <button>
            Entrar
        </button>
    </form>
  )
}

export default LoginPage
