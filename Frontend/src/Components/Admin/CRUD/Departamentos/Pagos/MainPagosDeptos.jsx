import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import EditarPagoAlquiler from './EditarPagosDepto';
import CrearPagoAlquiler from './CrearPagoDepto';
import '../../../../../Styles/table.css';
import { URL_PAGOS_ALQUILERES, URL_PAGOS_ALQUILERES_ELIMINAR} from '../../../../../Constants/endpoints-API';
import useAuthStore from '../../../../../Context/useAuthStore';
import useRegistroStore from '../../../../../Context/useRegistroStore';
import useVerRegistroStore from '../../../../../Context/useVerRegistroStore';
import Aside from '../../../../Layout/Aside';
import axios from 'axios';
import Swal from 'sweetalert2';
import VerPagosDeptos from './VerPagosDeptos';


const MainPagosDeptos = () => {

    const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();
    const {  setVerRegistroSeleccionado } = useVerRegistroStore();
    const token = useAuthStore((state) => state.token); 
    
    const [filtrado, setFiltrado] = useState('');
    const [datos, setDatos] = useState([]);
  
  
    const getPagosAlquileres = async () => {
      try {
        const response = await axios.get(URL_PAGOS_ALQUILERES, { headers: { Authorization: `Bearer ${token}` } });
        setDatos(response.data);
      } catch (error) {
        console.error("Error al obtener los pagos de alquiler:", error);
      }
    };

    // borrado logico
  const handleEliminarPagoAlquiler = async (pagoAlquiler) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el "${pagoAlquiler.nombreDepartamento}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.put(
          `${URL_PAGOS_ALQUILERES_ELIMINAR}${pagoAlquiler.id_departamento}`,
          { ...pagoAlquiler },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Eliminado!', 'El pago del alquiler ha sido eliminado correctamente.', 'success');
        getPagosAlquileres(); 
      } catch (error) {
        console.error('Error al eliminar el pago del alquiler:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el pago del alquiler.', 'error');
      }
    }
  };
  
    const columns = [
        { header: 'Nº', accessorKey: 'id_pagoAlquiler' },
        { header: 'Nombre Departamento', accessorKey: 'NombreDepartamento' },
        { header: 'Monto Pagado', accessorKey: 'MontoPagoAlquiler' },
        { header: 'Cliente', accessorFn: row => `${row.NombreCliente} ${row.ApellidoCliente}` },
        { header: 'Fecha del Pago', accessorKey: 'FechaPagoAlquiler' },
      {
        header: 'Acciones',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
            onClick={() => setVerRegistroSeleccionado(row.original)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-800 active:bg-blue-900 focus:outline-none"
          >
            Ver más
          </button>
          <button
            onClick={() => setRegistroSeleccionado(row.original)}
            className="bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"
          >
            Editar
          </button>
          <button
            onClick={() => handleEliminarPagoAlquiler(row.original)}
            className="bg-red-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-red-800 active:bg-red-900 focus:outline-none"
          >
            Eliminar
          </button>
        </div>
        )
      }
    ];
  
    const table = useReactTable({
      data: datos,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        globalFilter: filtrado
      },
      onGlobalFilterChange: setFiltrado
    });
  
    useEffect(() => {
      getPagosAlquileres();
    }, []);
  
    return (
<div>
<div>
  <p className="text-black font-semibold text-4xl flex justify-center mt-5">Registros de ventas de departamentos</p>
  
  {/* Buscador */}
  <div className="flex justify-center m-10">
    <div className="relative">
      <input
        className="w-80 md:w-96 lg:w-[400px] px-4 py-2 text-gray-800 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="search"
        placeholder="Buscar ventas..."
        value={filtrado}
        onChange={(e) => setFiltrado(e.target.value)}
      />
    </div>
  </div>

  {/* Botón para registrar */}
  <div className="flex justify-center m-6">
    <button
      onClick={openRegistroModal}
      className="bg-green-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-green-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
    >
      Registrar venta
    </button>
  </div>
</div>
      <div className='display flex'>
        <div className='position relative top-8'>
      <Aside/>
        </div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="pagination flex justify-center mt-4">
        {Array.from({ length: table.getPageCount() }, (_, index) => ( // Crea un array con la cantidad de páginas y por cada una crea un botón con el número de la página 
          <button
            key={index} 
            className={`m-2 px-4 py-2 rounded-full font-semibold text-[16px] ${
              table.getState().pagination.pageIndex === index 
                ? "bg-blue-600 text-white" // Estilo para la página seleccionada
                : "bg-gray-300 text-black" // Estilo para las páginas no seleccionadas
            }`}
            onClick={() => table.setPageIndex(index)} // Cambia a la página seleccionada
          >
            {index + 1} 
          </button>
        ))}
      </div>
      <EditarPagoAlquiler onPagoAlquilerEditado={getPagosAlquileres} />
      <CrearPagoAlquiler onPagoAlquilerRegistrado={getPagosAlquileres} />
      <VerPagosDeptos onPagoDeptoVer={getPagosAlquileres} />
      </div>
    );
  }

export default MainPagosDeptos
