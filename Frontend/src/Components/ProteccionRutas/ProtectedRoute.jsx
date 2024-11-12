import { Link, Outlet } from 'react-router-dom'; 
import useAuthStore from '../../Context/useAuthStore';
import { LOGIN } from '../../Routes/routes';


// roleRequired: Propiedad que indica el rol requerido para acceder a la ruta.
// children: Componentes hijos que se renderizarán si se cumplen las condiciones de autenticación y autorización.
const ProtectedRoute = ({ roleRequired, children }) => {

  const token = useAuthStore((state) => state.token);
  const userRole = useAuthStore((state) => state.userRole);

  // Si no hay token, redirige al usuario a la página de login.
  if (!token) {
    return <><Link to={LOGIN} /></>;
  }
  // Si el rol del usuario no coincide con el rol requerido, redirige a una página de "no autorizado".
  if (roleRequired && userRole !== roleRequired) {
    return <><Link to="/unauthorized" /></>;
  }
  // Si se cumplen todas las condiciones, renderiza los componentes hijos.
  return children ? children : <Outlet />; // Outlet es un componente de React Router que se utiliza para renderizar los componentes hijos de una ruta anidada.

};

export default ProtectedRoute;
