import { useEffect, useState } from 'react';
import { URL_LIBRO_DIARIO } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore'; // Estado global para el modal
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Aside from '../../../Layout/Aside';
import CrearCompraMateriales from '../CompraMateriales/CrearCompraMateriales';
import CrearPagoAlquiler from '../Departamentos/Pagos/CrearPagoDepto';
import CrearVtaTerrenos from '../Terrenos/Ventas/CrearVtaTerrenos';
import CrearOperaciones from '../Operaciones/CrearOperaciones';
import CrearRemuneracion from '../Remuneracion/CrearRemuneracion';
import CrearCertificados from '../Certificados/CrearCertificados';

const VerLibroDiario = () => {
  const token = useAuthStore((state) => state.token);
  const { setRegistroSeleccionado, openRegistroModal, registroSeleccionado, isRegistroModalOpen, closeRegistroModal } = useRegistroStore(); // Acciones y estado global del modal
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [prueba, setPrueba] = useState([]);

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
      if (response.status === 200) setPrueba(response.data.data);
    } catch (error) {
      console.error('Error al obtener los datos por GET:', error);
    }
  };

  const handleBuscarFecha = async () => {
    await enviarFechaPorPost();
    await obtenerDatosPorGet();
    setFechaRegistro(fechaSeleccionada);
  };

  const handleAbrirModal = (opcion) => {
    setRegistroSeleccionado(opcion); // Guardar la opción seleccionada en el estado global
    openRegistroModal(); // Abrir el modal
  };

  // Renderizar el modal correcto basado en registroSeleccionado
  const renderModal = () => {
    switch (registroSeleccionado) {
      case 'certificado':
        return <CrearCertificados onClose={closeRegistroModal} />;
      case 'remuneracion':
        return <CrearRemuneracion onClose={closeRegistroModal} />;
      case 'compraMaterial':
        return <CrearCompraMateriales onClose={closeRegistroModal} />;
      case 'ventaTerreno':
        return <CrearVtaTerrenos onClose={closeRegistroModal} />;
      case 'operacion':
        return <CrearOperaciones onClose={closeRegistroModal} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Toaster />
      <h2 className="text-center text-black font-semibold text-4xl">LIBRO DIARIO</h2>
      <h2 className="text-center text-black font-semibold text-4xl">Fecha Actual {fechaRegistro}</h2>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <div className="relative">
          <input
            type="date"
            className="px-4 py-2 rounded-lg border-2"
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
          />
        </div>
        <button onClick={handleBuscarFecha} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Buscar Fecha
        </button>
      </div>

      <div className="contenedor flex-row flex justify-center">
        <button onClick={() => handleAbrirModal('certificado')} className="bg-green-600 text-white px-6 py-2 rounded-full">
          Registrar Certificado
        </button>
        <button onClick={() => handleAbrirModal('remuneracion')} className="bg-green-600 text-white px-6 py-2 rounded-full">
          Registrar Remuneración
        </button>
        <button onClick={() => handleAbrirModal('compraMaterial')} className="bg-green-600 text-white px-6 py-2 rounded-full">
          Registrar Compra de Material
        </button>
        <button onClick={() => handleAbrirModal('ventaTerreno')} className="bg-green-600 text-white px-6 py-2 rounded-full">
          Registrar Venta de Terreno
        </button>
        <button onClick={() => handleAbrirModal('operacion')} className="bg-green-600 text-white px-6 py-2 rounded-full">
          Registrar Operación
        </button>
      </div>

      {/* Renderizar el modal si está abierto */}
      {isRegistroModalOpen && renderModal()}

      <div className="flex">
        <div className="relative top-8">
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
        <tbody>
          {prueba.length > 0 ? (
            prueba.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.TIPO}</td>
                <td>{item.Descripcion}</td>
                <td>{item.Monto}</td>
                <td>{item.Fecha}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No hay datos disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default VerLibroDiario;
