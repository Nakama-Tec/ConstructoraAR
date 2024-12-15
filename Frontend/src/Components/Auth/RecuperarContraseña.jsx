import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../Context/useAuthStore";
import { URL_RECUPERAR_CONTRASENA } from "../../Constants/endpoints-API";
import { HOME_SISTEMA_GESTION } from "../../Routes/routes";
import Swal from "sweetalert2";

const RecuperarContraseña = () => {

  const [correoUsuario, setCorreoUsuario] = useState("");
  
  const setToken = useAuthStore((state) => state.setToken);
  const setUserRole = useAuthStore((state) => state.setUserRole);
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de correo electrónico
    const emailRegex = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    if (!emailRegex.test(correoUsuario)) {
    Swal.fire({
      icon: 'error',
      title: 'Error de validación',
      text: 'Por favor, ingrese un correo electrónico válido!',
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'top-center'
    });
    return;
    }

    try {
    const response = await axios.post(URL_RECUPERAR_CONTRASENA, { correoUsuario });
    setToken(response.data.token);
  
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  
    const decodedToken = JSON.parse(atob(response.data.token.split(".")[1]));
    setUserRole(decodedToken.role);
  
    navigate(HOME_SISTEMA_GESTION);
    } catch (error) {
    console.error("Login incorrecto:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error de autenticación',
      text: 'Correo electrónico incorrecto!',
      timer: 3000,
      showConfirmButton: false,
      toast: true, 
      position: 'top-center'
      });
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
        Recupera tu contraseña!
      </h2>
      <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
        Completa el siguiente campo para recuperar tu contraseña.
      </p>
      <div className="mt-10">
        <div className="relative">
        <label className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200">
          Correo electrónico
        </label>
        <input
          className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Correo electrónico"
          onChange={(e) => setCorreoUsuario(e.target.value)}
          required
        />
        </div>
        <div className="mt-10">
        <button
          className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
          type="submit"
          value="Login"
        >
          Recuperar
        </button>
        </div>
      </div>
      </div>
      <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
      </div>
    </Form>
    </div>

  )
}

export default RecuperarContraseña
