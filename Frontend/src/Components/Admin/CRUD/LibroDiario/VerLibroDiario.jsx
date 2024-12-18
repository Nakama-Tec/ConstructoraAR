import { useEffect, useState } from 'react';
import { URL_LIBRO_DIARIO } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Aside from '../../../Layout/Aside';
import { Link } from 'react-router-dom';

const VerLibroDiario = () => {
  const token = useAuthStore((state) => state.token);
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const date = new Date();
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    const fechaActual = `${año}-${mes}-${dia}`;
    setFechaRegistro(fechaActual);
    setFechaSeleccionada(fechaActual);
  }, []);

  const enviarFechaPorPost = async () => {
    try {
      const response = await axios.post(
        `${URL_LIBRO_DIARIO}/post`,
        { fechaRegistro },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) obtenerDatosPorGet();
    } catch (error) {
      console.error('Error al enviar la fecha por POST:', error);
    }
  };

  const obtenerDatosPorGet = async () => {
    try {
      const response = await axios.get(`${URL_LIBRO_DIARIO}/get`, {
        params: { fechaRegistro },
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.status === 200) setDatos(response.data.data);
    } catch (error) {
      console.error('Error al obtener los datos por GET:', error);
    }
  };

  const handleBuscarFecha = async () => {
    await enviarFechaPorPost();
    await obtenerDatosPorGet();
    setFechaRegistro(fechaSeleccionada);
  };

  return (
    <div>
      <Toaster />
      <p className="text-black font-semibold text-4xl flex justify-center mt-5 uppercase">Libro Diario</p>

      {/* Selector de fecha */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6">
        <div className="relative">
          <input
            type="date"
            className="px-4 py-2 rounded-lg border-2"
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
          />
        </div>
        <button
          onClick={handleBuscarFecha}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Buscar Fecha
        </button>
      </div>

      {/* Botones encima de la tabla */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Link
          to={'/Admin/Certificados'}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Registrar Certificado
        </Link>
        <Link
          to={'/Admin/Remuneraciones'}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Registrar Remuneración
        </Link>
        <Link
          to={'/Admin/CompraMateriales'}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Registrar Compra de Material
        </Link>
        <Link
          to={'/Admin/VentaTerrenos'}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Registrar Venta de Terreno
        </Link>
        <Link
          to={'/Admin/Operaciones'}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Registrar Operación
        </Link>
      </div>

      {/* Tabla */}
      <div className="flex flex-col lg:flex-row">
        <div className="relative lg:top-8 mb-4 lg:mb-0">
          <Aside />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Tipo</th>
                <th className="border border-gray-300 px-4 py-2">Descripción</th>
                <th className="border border-gray-300 px-4 py-2">Monto</th>
                <th className="border border-gray-300 px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {datos.length > 0 ? (
                datos.map((item, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.TIPO}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.Descripcion}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.Monto}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.Fecha}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center border border-gray-300 px-4 py-2">
                    No hay datos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerLibroDiario;
