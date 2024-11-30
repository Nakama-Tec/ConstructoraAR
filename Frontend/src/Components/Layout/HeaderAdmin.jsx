import useAuthStore from "../../Context/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { LOGIN } from "../../Routes/routes";
import logo from "../../assets/logoConstructora.svg";

const HeaderAdmin = () => {
  const token = useAuthStore((state) => state.token);
  const userRole = useAuthStore((state) => state.userRole);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const userName = useAuthStore((state) => state.userName);

  const navigate = useNavigate();
  // funcion para que si no es admin y no se genero token no muestre
  const handleLogout = () => {
    clearAuth();
    navigate({ LOGIN });
  };
  return (
    <div className="dark:bg-gray-900 text-white flex justify-between items-center h-24 p-5">
      <Link to={"/"} >
      <img
      className="logo h-40 w-auto"
      src={logo}
      alt="Logo"
      />
      </Link>
      {userName && <p className="text-4xl font-semibold">Bienvenido, {userName}!</p>}
      <div className="boton">
        {token !== null && userRole === "admin" ? (
          <div>
            <Button onClick={handleLogout} className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 font-semibold text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
              Cerrar Sesión
            </Button>
          </div>
        ) : (
          <Link to={LOGIN} className="login text-white btn-warning">
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderAdmin;
