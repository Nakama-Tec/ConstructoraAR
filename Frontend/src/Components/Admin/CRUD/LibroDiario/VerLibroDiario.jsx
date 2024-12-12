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
{/* Selección de fecha */}
<div className="flex flex-col mt-5 sm:flex-row items-center justify-center gap-4 mb-6">
  <div className="flex flex-col sm:flex-row items-center gap-2">
    <label
      htmlFor="fecha"
      className="text-lg font-semibold text-gray-700 dark:text-dark whitespace-nowrap"
    >
      Seleccionar Fecha:
    </label>
    <div className="relative">
      <input
        type="date"
        id="fecha"
        className="px-4 py-2 rounded-lg border-2 border-gray-900 dark:border-zinc-600 dark:bg-gray-100 text-black dark:text-black focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-300"
        value={fechaSeleccionada}
        onChange={(e) => setFechaSeleccionada(e.target.value)}
      />
    </div>
  </div>
  <button
    onClick={handleBuscarFecha}
    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-all duration-300"
  >
    Buscar Fecha
  </button>
</div>
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
