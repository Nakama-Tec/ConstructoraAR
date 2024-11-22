import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { URL_LIBRO_DIARIO } from '../../../Constants/endpoints-API';
import useAuthStore from '../../../Context/useAuthStore';
import Aside from '../../Layout/Aside';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const Prueba2 = () => {
  const token = useAuthStore((state) => state.token);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [fechaRegistro, setFechaRegistro] = useState(''); // Fecha actual en formato YYYY-MM-DD
  const [fechaSeleccionada, setFechaSeleccionada] = useState(''); // Fecha seleccionada manualmente
  const [datos, setDatos] = useState([]); // Datos de la tabla

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

  // Función para obtener los datos del libro diario
  const getLibroDiario = async () => {
    if (!token) {
      console.warn('Token no disponible. La petición no se ejecutará.');
      return;
    }

    try {
      const response = await axios.post(
        URL_LIBRO_DIARIO,
        // { fechaRegistro: fecha },
        {fechaRegistro},
        { headers: { authorization: `Bearer ${token}` } }
      );
      setDatos(response.data);
    } catch (error) {
      console.error('Error al obtener el libro diario:', error);
      if (error.response && error.response.status === 401) {
        alert('Sesión expirada o no autorizada');
        clearAuth();
      } else {
        alert('Hubo un error al obtener los datos. Intenta nuevamente.');
      }
    }
  };

  const handleLogout = () => {
    clearAuth();
  };

  // Llamar a la API solo cuando se presiona el botón
  const handleBuscarFecha = () => {
    setFechaRegistro(fechaSeleccionada); // Actualizar la fecha usada en la petición
  };

  // Llamada inicial al montar el componente y cada vez que cambie fechaRegistro
  useEffect(() => {
    if (fechaRegistro && token) {
      getLibroDiario(fechaRegistro); // Pasar la fecha actualizada al obtener los datos
    }
  }, [fechaRegistro, token]);

  return (
    <div>
      <br />
      <br />
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
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Nº</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {datos.map((dato, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{dato.fechaRegistro}</td>
              <td>{dato.descripcion}</td>
              <td>{dato.tipo}</td>
              <td>{dato.monto}</td>
              <td>
                <Button onClick={() => console.log('Editar:', dato.id)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <Aside />
      <Button onClick={handleLogout} className="btn btn-secondary">
        Cerrar Sesión
      </Button>
    </div>
  );
};

export default Prueba2;
