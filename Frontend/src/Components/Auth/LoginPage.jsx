import { useState } from 'react';
import { Form} from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../Context/useAuthStore';
import { URL_LOGIN } from '../../Constants/endpoints-API';
import { PAGOS } from '../../Routes/routes';


// import { useState } from 'react'
// import axios from 'axios'
// import {useNavigate} from 'react-router-dom'
// import Aside from '../Layout/Aside';

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

      // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
   
      const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
      setUserRole(decodedToken.role);
      navigate(PAGOS);
    } catch (error) {
      console.error('Login incorrecto:', error);
      alert('Usuario o contraseña incorrectos');
   
    }
  };


  // const [body, setBody] = useState({username: '', password: ''});
  // const navigate = useNavigate();


  // const handleChange = ({target}) => {
  //   const {name, value} = target;
  //   setBody({...body, [name]: value});
  // }

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:8000/login', body)
  //   .then(({data}) => {
  //       localStorage.setItem('auth', '"yes"');
  //       navigate('/admin');
  //   })
  //   .catch(({response}) => {
  //       console.log(response)
  //   })
  // }

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
                   <input type="password" placeholder="Password" onChange={(e) => setPasswordUsuario(e.target.value)} required />
                   <br /><br />
                   <button type="submit" className="Login" value="Login" >login</button>
                   <br />
                   {/* <p className="link-text">Forget password? <Link to={RECUPERAR}>Click Here</Link></p>               */}
            </div> 
          </Form>
        </div>
      </div>
      <br />
              {/* <form>
                  <label className="custom-label">Usuario:</label>
                  <input
                         placeholder="Usuario"
                         type="text" 
                         value={body.username}
                         onChange={handleChange}
                         name='username'
                         />
                  <label className="custom-label">Contraseña:</label>
                  <input
                         placeholder="Contraseña"
                         type="password" 
                         value={body.password}
                         onChange={handleChange}
                         name='password'
                         />
                  <button className="custom-button" onClick={onSubmit}>Ingresar</button>
              </form> */}

              {/* <Aside /> */}
          </>
  );
}


export default LoginPage
