import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import axios from 'axios';
import Swal from 'sweetalert2';
import Aside from '../../../../Layout/Aside';
import useRegistroStore from '../../../../../Context/useRegistroStore';
import '../../../../../Styles/table.css';
import { URL_ALQUILERES, URL_ALQUILERES_ELIMINAR } from '../../../../../Constants/endpoints-API';
import useAuthStore from '../../../../../Context/useAuthStore';
import useVerRegistroStore from '../../../../../Context/useVerRegistroStore';
import EditarAlquiler from './EditarAlquiler';
import CrearAlquiler from './CrearAlquiler';
import VerClientes from './VerAlquiler';


const MainAlquiler = () => {

  const token = useAuthStore((state) => state.token);

  const [filtrado, setFiltrado] = useState('');
  const [datos, setDatos] = useState([]);
  const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();
  const { setVerRegistroSeleccionado } = useVerRegistroStore();




  const getAlquileres = async () => {
    try {
      const response = await axios.get(URL_ALQUILERES, { headers: { Authorization: `Bearer ${token}` } });
      setDatos(response.data);
    } catch (error) {
      console.error("Error al obtener alquiler:", error);
    }
  };

  const handleEliminarAlquiler = async (alquiler) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar este alquiler ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.put(
          `${URL_ALQUILERES_ELIMINAR}${alquiler.id_alquilerDepto}`,
          { ...alquiler },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Eliminado!', 'El alquiler ha sido eliminado correctamente.', 'success');
        getAlquileres();
      } catch (error) {
        console.error('Error al eliminar alquiler:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el alquiler.', 'error');
      }
    }
  };


  const columns = [
    { header: 'Nº Alquiler', accessorKey: 'id_alquilerDepto' },
    { header: 'NombreDepartamento', accessorKey: 'NombreDepartamento' },
    { header: 'Precio Departamento', accessorFn: row => `$${row.PrecioDepartamento}` },
    { header: 'Precio Expensa', accessorFn: row => `$${row.PrecioExpensa}` },
    { header: 'Cliente', accessorFn: row => `${row.NombreCliente} ${row.ApellidoCliente}` },
    

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
            onClick={() => handleEliminarAlquiler(row.original)}
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
    getAlquileres();
  }, []);


  return (
    <div>
      <p className="text-black font-semibold text-4xl display flex justify-center m-5">Registros de Alquileres</p>
      <div className="input-search">
        <input
          className="text-black"
          type="search"
          placeholder="Buscador"
          value={filtrado}
          onChange={(e) => setFiltrado(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <button
          onClick={openRegistroModal}
          className="bg-green-600 text-white px-4 py-2 m-2 rounded-full transition duration-200 ease-in-out hover:bg-green-800 active:bg-green-900 focus:outline-none position relative left-64"
        >
          Registrar Alquileres
        </button>
      </div>
      <div className='display flex'>
        <div className='position relative top-8'>
          <Aside />
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
      <EditarAlquiler onAlquilerEditado={getAlquileres} />
      <CrearAlquiler onAlquilerRegistrado={getAlquileres} />
      <VerClientes onAlquilerVer={getAlquileres} />

    </div>
  );
};
export default MainAlquiler