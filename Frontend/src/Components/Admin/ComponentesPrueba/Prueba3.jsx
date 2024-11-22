import React, { useEffect, useState } from 'react'
import { URL_LIBRO_DIARIO } from '../../../Constants/endpoints-API'
import useAuthStore from '../../../Context/useAuthStore'
import axios from 'axios'
import Button from 'react-bootstrap/Button'


const Prueba3 = () => {

// const initialState = {
//   Tipo :"",
//   Descripcion:"",
//   Monto:"",
//   fecha:""
  
// } 

const token = useAuthStore((state) => state.token);
const userRole = useAuthStore((state) => state.userRole);
const clearAuth = useAuthStore((state) => state.clearAuth);
const [fechaRegistro, setFechaRegistro] = useState(''); // Fecha actual en formato YYYY-MM-DD
const [fechaSeleccionada, setFechaSeleccionada] = useState(''); // Fecha seleccionada manualmente
const [prueba, setPrueba] = useState([])
// const [prueba2, setPrueba2] = useState(initialState)


// Obtener la fecha actual en formato YYYY-MM-DD
useEffect(() => {
  const date = new Date();
  const año = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  const fechaActual = `${año}-${mes}-${dia}`;
  setFechaRegistro(fechaActual);
  setFechaSeleccionada(fechaActual); // Inicializar con la fecha actual
}, []);

const INIPrueba = async () => {

  try {
    const response = await axios.post(
      URL_LIBRO_DIARIO, {fechaRegistro},
      { headers: { authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
      setPrueba(response.data);
      // setPrueba2(response.data[0])
      console.log(response.data)
      alert(response.data)
      // console.log(response.data[0])
    }
  } catch (error) {
    console.error('Error al obtener la prueba:', error);
  }}

 // Llamar a la API solo cuando se presiona el botón
 const handleBuscarFecha = () => {
  setFechaRegistro(fechaSeleccionada); // Actualizar la fecha usada en la petición
};

console.log(prueba)

useEffect(() => {if(token){INIPrueba()}},[[fechaRegistro, token]])

  return (
    <div>
      <h3>prueba 3</h3>
      <label htmlFor="fecha">Seleccionar Fecha:</label>
      <input
        type="date"
        id="fecha"
        className="text-black"
        value={fechaSeleccionada}
        onChange={(e) => setFechaSeleccionada(e.target.value)}
      />
      <Button className="btn btn-primary" onClick={handleBuscarFecha}>
        Buscar por Fecha
      </Button>
      <br />
      <br />
      <hr />
      <ul>
        {prueba.map((item,index) => (
          
          <div key={index}>
            <h3>dentro</h3>
            <li>{item.TIPO}</li>
            <li>{item.Descripcion}</li>
            <li>{item.Monto}</li>
            <li>{item.Fecha}</li>
            
            </div>

          
        ))}
      </ul>
    </div>
  )
}

export default Prueba3
