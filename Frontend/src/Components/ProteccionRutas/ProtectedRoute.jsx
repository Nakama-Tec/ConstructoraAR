import { Navigate, Outlet } from 'react-router-dom'; 
import useAuthStore from '../../Context/useAuthStore';
import { LOGIN } from '../../Routes/routes';


// rolesRequired: Propiedad que indica el rol requerido para acceder a la ruta.
// children: Componentes hijos que se renderizarán si se cumplen las condiciones de autenticación y autorización.
const ProtectedRoute = ({ rolesRequired = [], children }) => {

  const token = useAuthStore((state) => state.token);//obtiene el token de autenticación desde el hook useAuthStore.
  const userRole = useAuthStore((state) => state.userRole);//obtiene el rol del usuario autenticado desde el hook useAuthStore.

  // Si no hay token, redirige al usuario a la página de login.
  if (!token) {
    return <><Navigate to={LOGIN} /></>;
  }
 
  
  // Si el rol del usuario no coincide con el rol requerido, redirige a una página de "no autorizado".
  if (rolesRequired.length > 0 && !rolesRequired.includes(userRole)) {//userRol viene del token decodificado
    return <><Navigate to="/unauthorized" /></>;
  }
  // Si se cumplen todas las condiciones, renderiza los componentes hijos.
  return children ? children : <Outlet />; // Outlet es un componente de React Router que se utiliza para renderizar los componentes hijos de una ruta anidada.

};

export default ProtectedRoute;
