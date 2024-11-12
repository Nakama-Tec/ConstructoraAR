import MainClientes from "../../Components/Admin/CRUD/Clientes/MainClientes"
import Aside from "../../Components/Layout/Aside"
import FlujoCaja from "../FlujoCaja/FlujoCaja"

const Home = () => {
  return (
    <div>Home
<MainClientes/>
<FlujoCaja/>  
    {/* <Aside/> */}
    </div>
  )
}

export default Home