import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../Context/useAuthStore";
import { URL_LOGIN } from "../../Constants/endpoints-API";
<<<<<<< HEAD
import { HOME_ADMIN, LIBRO_DIARIO } from "../../Routes/routes";
=======
import { HOME_SISTEMA_GESTION } from "../../Routes/routes";
>>>>>>> 642c4741d2775e508a060967a042fce2f850e66f

const LoginPage = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const setUserRole = useAuthStore((state) => state.setUserRole);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL_LOGIN, {
        nombreUsuario,
        passwordUsuario,
      });
      setToken(response.data.token);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`; //esto es para que el token se envie en cada request

      const decodedToken = JSON.parse(atob(response.data.token.split(".")[1])); //esto es para decodificar el token y obtener el rol del usuario
      setUserRole(decodedToken.role);
<<<<<<< HEAD
      navigate(HOME_ADMIN); //esto es para redirigir a la pagina de inicio
=======
      navigate(HOME_SISTEMA_GESTION); //esto es para redirigir a la pagina de inicio
>>>>>>> 642c4741d2775e508a060967a042fce2f850e66f
    } catch (error) {
      console.error("Login incorrecto:", error);
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="display flex justify-center relative top-24">
      <Form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 m-10 w-[40%]"
      >
        <div className="px-8 py-10 md:px-10">
          <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
            Bienvenido!
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
            Te hemos echado de menos, inicia sesión para continuar.
          </p>
          <div className="mt-10">
            <div className="relative">
              <label className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200">
                Usuario
              </label>
              <input
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                type="text"
                placeholder="Nombre de usuario"
                autoComplete="username"
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
              />
            </div>
            <div className="mt-6">
              <label className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200">
                Contraseña
              </label>
              <input
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPasswordUsuario(e.target.value)}
                required
              />
            </div>
            <div className="mt-10">
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
        <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
          <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
            Olvidaste tu contraseña?
            <a className="font-medium" href="#">
              {" "}
              Recuperarla
            </a>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
