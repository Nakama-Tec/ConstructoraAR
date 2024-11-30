import MainPagosDeptos from "../../Components/Admin/CRUD/Departamentos/Pagos/MainPagosDeptos"
import FooterAdmin from "../../Components/Layout/FooterAdmin"
import HeaderAdmin from "../../Components/Layout/HeaderAdmin"

const PagosDepartamentos = () => {
  return (
    <>
    <HeaderAdmin/>
     <MainPagosDeptos /> 
     <FooterAdmin />
    </>
  )
}

export default PagosDepartamentos
