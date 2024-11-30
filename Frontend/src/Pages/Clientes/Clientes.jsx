import MainClientes from '../../Components/Admin/CRUD/Clientes/MainClientes'
import FooterAdmin from '../../Components/Layout/FooterAdmin'
import HeaderAdmin from '../../Components/Layout/HeaderAdmin'

const Clientes = () => {
  return (
    <div>
      <HeaderAdmin/>
      <MainClientes/>
      <FooterAdmin/>
    </div>
  )
}

export default Clientes
