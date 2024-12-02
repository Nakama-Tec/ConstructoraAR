import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import EditarDepartamento from './EditarDepto';
import CrearDepartamento from './CrearDepto';
import VerDepto from './VerDepto';
import '../../../../../Styles/table.css';
import { URL_DEPARTAMENTOS, URL_DEPARTAMENTOS_ELIMINAR } from '../../../../../Constants/endpoints-API';
import useAuthStore from '../../../../../Context/useAuthStore';
import useRegistroStore from '../../../../../Context/useRegistroStore';
import useVerRegistroStore from '../../../../../Context/useVerRegistroStore';
import Aside from '../../../../Layout/Aside';
import axios from 'axios';
import Swal from 'sweetalert2';

const MainDepto = () => {

  const token = useAuthStore((state) => state.token);
  const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();
  const {setVerRegistroSeleccionado} = useVerRegistroStore();

  const [filtrado, setFiltrado] = useState('');
  const [datos, setDatos] = useState([]);

  const getDepartamentos = async () => {
    try {
      const response = await axios.get(URL_DEPARTAMENTOS, { headers: { Authorization: `Bearer ${token}` } });
      setDatos(response.data);
    } catch (error) {
      console.error('Error al obtener departamentos:', error);
    }
  };
  
// borrado logico
  const handleEliminarDepto = async (departamento) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el "${departamento.nombreDepartamento}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.put(
          `${URL_DEPARTAMENTOS_ELIMINAR}${departamento.id_departamento}`,
          { ...departamento },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Eliminado!', 'El departamento ha sido eliminado correctamente.', 'success');
        getDepartamentos(); 
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al eliminar el departamento.', 'error');
      }
    }
  };

  const columns = [
    { header: 'Nº', accessorKey: 'id_departamento' },
    { header: 'Nombre Departamento', accessorKey: 'nombreDepartamento' },
    { header: 'Dirección', accessorKey: 'direccionDepartamento' },
    { header: 'Descripción', accessorKey: 'descripcionDepartamento' },
    { header: 'Precio Departamento', accessorFn: row => `$${row.precioDepartamento}` },
    { header: 'Precio Expensa', accessorFn: row => `$${row.precioExpensa}` },
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
            onClick={() => handleEliminarDepto(row.original)}
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
    getDepartamentos();
  }, []);

  return (
    <div>
      <p className="text-black font-semibold text-4xl display flex justify-center relative top-12 m-5">Registros de Departamentos</p>
      <div className="input-search relative top-20">
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
          className="bg-green-600 text-white px-4 py-2 m-2 rounded-full transition duration-200 ease-in-out hover:bg-green-800 active:bg-green-900 focus:outline-none position relative left-72"
        >
          Registrar departamento
        </button>
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
      <EditarDepartamento onDeptoEditado={getDepartamentos} />
      <CrearDepartamento onDeptoRegistrado={getDepartamentos} />
      <VerDepto onDeptoVer={getDepartamentos} />
      </div>
  );
};

export default MainDepto
