import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import "./login.css";

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
                          
              {/* aca empieza el otro */}
              <div className="loginContainer">
      <aside className="loginLeft">
        <div className="loginLeftText">
          <p></p>
        </div>
      </aside>


      <aside className="loginRight">
        <button className="btnCreateAccount">Crear Cuenta</button>

        <div className="formContainer">
          <h2>Iniciar sesión</h2>
          <p>Please enter your details below to sign in</p>
          <form className="loginForm">
            <div className="formControl">
              <label htmlFor="email">Your email adress</label>
              <input  placeholder="username"
                         type="text" 
                         value={body.username}
                         onChange={handleChange}
                         name='username' ></input>
            </div>
            <div className="formControl">
              <label htmlFor="email">Your password</label>
              <input     placeholder="password"
                         type="password" 
                         value={body.password}
                         onChange={handleChange}
                         name='password'></input>
            </div>
            <button type="submit" onClick={onSubmit} className="loginSubmitBtn">
              Sign in
            </button>
          </form>
        </div>
      </aside>
    </div>
          </>
  );
}


export default LoginPage
