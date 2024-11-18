import { useState } from 'react';
import { Form} from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../Context/useAuthStore';
import { URL_LOGIN } from '../../Constants/endpoints-API';
import { LIBRO_DIARIO } from '../../Routes/routes';

const LoginPage = () => {

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [passwordUsuario, setPasswordUsuario] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const setUserRole = useAuthStore((state) => state.setUserRole);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL_LOGIN, { nombreUsuario,passwordUsuario });
      setToken(response.data.token);
       alert("hola token "+response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;//esto es para que el token se envie en cada request
   
      const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));//esto es para decodificar el token y obtener el rol del usuario
      setUserRole(decodedToken.role);
      navigate(LIBRO_DIARIO);//esto es para redirigir a la pagina de inicio
    } catch (error) {
      console.error('Login incorrecto:', error);
      alert('Usuario o contraseña incorrectos');
   
    }
  };

  return(
      <>
       <br /><br /><br /><br />
      <div className="box">
        <div className="box2">
          <Form onSubmit={handleSubmit}>
            <div className="title">
              <h2>Login Form</h2>
            </div>

            <div className="input-box">
                   <label className="label-color">User name</label>
                   <input type="text" placeholder="username" onChange={(e) => setNombreUsuario(e.target.value)} required />
                   <br />
                   <label className="label-color">Password</label>
                   <input type="password" placeholder="Password" autocomplete="current-password" onChange={(e) => setPasswordUsuario(e.target.value)} required />
                   <br /><br />
                   <button type="submit" className="Login" value="Login" >login</button>
                   <br />
            </div> 
          </Form>
        </div>
      </div>
      <br />
       
          </>
  );
}


export default LoginPage
