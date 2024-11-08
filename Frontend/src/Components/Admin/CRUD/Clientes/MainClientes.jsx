import { useAuthStore } from '../../../../Context/auth'
import { useNavigate } from 'react-router-dom'

const MainClientes = () => {

    const logout = useAuthStore(state => state.logout)
    const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => {
        logout()
        navigate('/login')
      }}>
        Salir de Admin
      </button>
    </div>
  )
}

export default MainClientes
