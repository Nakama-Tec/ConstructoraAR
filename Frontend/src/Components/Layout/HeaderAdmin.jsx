import React from 'react'
import  useAuthStore from '../../Context/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import {Button} from "react-bootstrap"
import {LOGIN} from "../../Routes/routes"

const HeaderAdmin = () => {
    const token = useAuthStore((state) => state.token);
  const userRole = useAuthStore((state) => state.userRole);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const navigate = useNavigate();
      // funcion para que si no es admin y no se genero token no muestre 
const handleLogout = () => {
    clearAuth();
    navigate({LOGIN});
  };
  return (

    <div>
          <h3>Header</h3>
          <div className="boton">
      {token !== null && userRole==="admin" ?  <div><h3>Bienvenido Matias</h3><Button onClick={handleLogout} className="btn btn-secondary">
      Cerrar Sesión</Button></div> : <Link to={LOGIN} className="login text-white btn-warning"><RxAvatar className="btnlogin"/></Link>}
      </div>
        <hr />
      
      
    </div>
  )
}

export default HeaderAdmin
