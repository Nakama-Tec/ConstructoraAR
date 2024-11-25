import { useEffect, useState } from 'react';
import { URL_LIBRO_DIARIO } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Aside from '../../../Layout/Aside';
import toast, { Toaster } from 'react-hot-toast'; 
const VerLibroDiario = () => {
  const token = useAuthStore((state) => state.token);
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [prueba, setPrueba] = useState([]);

  // Obtener la fecha actual en formato YYYY-MM-DD
  useEffect(() => {
    const date = new Date();
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    const fechaActual = `${año}-${mes}-${dia}`;
    setFechaRegistro(fechaActual);
    setFechaSeleccionada(fechaActual); // Inicializar con la fecha actual
    verificarTareasPendientes(); // Llamar al verificar tareas pendientes automáticamente

  }, []); 

  // Verificar tareas pendientes
  const verificarTareasPendientes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/pendientes/', { headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 200) {
        const tareas = response.data;
        const pendientes = tareas.filter((tarea) => tarea.estado === 'Pendiente');
        if (pendientes.length > 0) {
          toast(`Tienes ${pendientes.length} tareas pendientes.`, { icon: '⚠️' });
        } else {
          toast('No tienes tareas pendientes.', { icon: '✅' });
        }
      }
    } catch (error) {
      console.error('Error al verificar tareas pendientes:', error);
      toast.error('Error al verificar tareas pendientes.');
    }
  };

  // Enviar la fecha por POST
  const enviarFechaPorPost = async () => {
    try {
      const response = await axios.post(
        `${URL_LIBRO_DIARIO}/post`,
        { fechaRegistro },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log('Fecha enviada con éxito Post:', response.data);
        obtenerDatosPorGet(); // Llama al GET después del POST
      }
    } catch (error) {
      console.error('Error al enviar la fecha por POST:', error);
    }
  };

  // Obtener los datos por GET
  const obtenerDatosPorGet = async () => {
    try {
      const response = await axios.get(`${URL_LIBRO_DIARIO}/get`, {
        params: { fechaRegistro },
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setPrueba(response.data.data);
        console.log('Datos obtenidos Get:', response.data.data);
      }
    } catch (error) {
      console.error('Error al obtener los datos por GET:', error);
    }
  };

  // Llamar al POST al presionar el botón
  const handleBuscarFecha = async () => {
    await enviarFechaPorPost(); // Enviar la fecha por POST
    await obtenerDatosPorGet();
    await setFechaRegistro(fechaSeleccionada); // Actualizar la fecha usada
  };

  return (
    <div>
      <Toaster /> {/* Componente para mostrar notificaciones */}
      <br />
      <br />
      <h2 className="text-center text-black text-4xl">LIBRO DIARIO</h2>
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
      <hr />
      <br />
      <div className="display flex">
        <div className="position relative top-8">
          <Aside />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          {prueba.length > 0 ? (
            <tbody>
              {prueba.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.TIPO}</td>
                  <td>{item.Descripcion}</td>
                  <td>{item.Monto}</td>
                  <td>{item.Fecha}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p></p>
          )}
        </table>
      </div>
    </div>
  );
};

export default VerLibroDiario;
