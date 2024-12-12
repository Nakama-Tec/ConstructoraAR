import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../Context/useAuthStore";
import { URL_LOGIN } from "../../Constants/endpoints-API";
import { HOME_SISTEMA_GESTION } from "../../Routes/routes";
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");

  const setToken = useAuthStore((state) => state.setToken);
  const setUserRole = useAuthStore((state) => state.setUserRole);
  const setUserName = useAuthStore((state) => state.setUserName);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL_LOGIN, { nombreUsuario, passwordUsuario });
      setToken(response.data.token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      const decodedToken = JSON.parse(atob(response.data.token.split(".")[1]));
      setUserRole(decodedToken.role);

      setUserName(nombreUsuario); // Guardar el nombre de usuario en el estado global

      navigate(HOME_SISTEMA_GESTION);
    } catch (error) {
      console.error("Login incorrecto:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Usuario o contraseña incorrectos',
        timer: 3000, // Tiempo en milisegundos para que se cierre automáticamente
        showConfirmButton: false,
        toast: true, 
        position: 'top-center'
      });
    }
  };
  return (
<div className="flex justify-center relative top-24 px-4 sm:px-6">
  <Form
    onSubmit={handleSubmit}
    className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 w-full lg:w-[40%] h-[100%] m-4"
  >
    <div className="px-4 py-6 sm:p-6 md:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
        Bienvenido!
      </h2>
      <p className="text-center text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3">
        Te hemos echado de menos, inicia sesión para continuar.
      </p>
      <div className="mt-8">
        <div className="relative">
          <label className="block mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-200">
            Nombre de Usuario
          </label>
          <input
            className="block w-full px-4 py-3 mt-1 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            type="text"
            placeholder="Nombre de usuario"
            autoComplete="username"
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-200">
            Contraseña
          </label>
          <input
            className="block w-full px-4 py-3 mt-1 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPasswordUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mt-8">
          <button
            className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
            type="submit"
            value="Login"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
    <div className="px-4 py-4 bg-blue-200 dark:bg-zinc-800">
      <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
        Olvidaste tu contraseña?
        <Link
          to={"/area-empleados/RecuperarContraseña"}
          className="font-medium underline hover:text-blue-600 dark:hover:text-blue-400"
        >
          {" "}
          Recuperarla
        </Link>
      </div>
    </div>
  </Form>
</div>
  );
};

export default LoginPage;
