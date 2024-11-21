import Prueba1 from "../../../Components/Admin/ComponentesPrueba/Prueba1"
import TablaPagos from "../../../Components/Admin/CRUD/Pagos/TablaPagos"
import Aside from "../../../Components/Layout/Aside"
import Clientes from "../../Clientes/Clientes"

const Home = () => {
  return (
    <div>
      <Aside /> 
      <Prueba1 /> 
      <TablaPagos />
    </div>
  )
}

export default Home 