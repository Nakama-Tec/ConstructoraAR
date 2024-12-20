import useAuthStore from "../../Context/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { HOME_SISTEMA_GESTION, LOGIN } from "../../Routes/routes";
import logo from "../../assets/logoConstructora.svg";

const HeaderAdmin = () => {
  const token = useAuthStore((state) => state.token);
  const userRole = useAuthStore((state) => state.userRole);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  // const userName = useAuthStore((state) => state.userName);

  const navigate = useNavigate();
  
  // funcion para que si no es admin y no se genero token no muestre
  const handleLogout = () => {
    clearAuth();
    navigate({ LOGIN });
  };
  return (
<div className="bg-gray-900 text-white flex flex-col md:flex-row justify-between items-center h-auto md:h-24 p-5">

  <Link to={HOME_SISTEMA_GESTION} className="flex items-center">
    <img
      className="logo mt-5 rounded-full h-28 md:h-24 lg:h-[75px] w-auto"
      src="https://i.imgur.com/IF7jIXu.jpeg"
      alt="Avatar de perfil"
    />
  </Link>

  {userRole && (
    <p className="text-3xl relative left-10 md:text-4xl lg:text-4xl font-semibold mt-4 md:mt-0 uppercase">
      Bienvenido, {userRole}!
    </p>
  )}

  <div className="boton mt-4 md:mt-0">
    {token !== null && (userRole === "admin" || userRole === "empleado") ? (
      <Button
        onClick={handleLogout}
        className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out hover:bg-red-700 font-semibold text-sm md:text-base rounded-md hover:scale-105"
      >
        Cerrar Sesión
      </Button>
    ) : (
      <Link
        to={LOGIN}
        className="text-white bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 transition"
      >
        Iniciar Sesión
      </Link>
    )}
  </div>
</div>
  );
};

export default HeaderAdmin;
