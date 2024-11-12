import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {

  const [body, setBody] = useState({username: '', password: ''});
  const navigate = useNavigate();


  const handleChange = ({target}) => {
    const {name, value} = target;
    setBody({...body, [name]: value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/login', body)
    .then(({data}) => {
        localStorage.setItem('auth', '"yes"');
        navigate('/admin');
    })
    .catch(({response}) => {
        console.log(response)
    })
  }

  return(
      <>
              <form>
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
              </form>
          </>
  );
}


export default LoginPage
