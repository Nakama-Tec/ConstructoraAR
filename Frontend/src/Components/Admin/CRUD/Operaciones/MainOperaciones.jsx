import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import '../../../../Styles/table.css';
import { URL_OPERACIONES,URL_OPERACIONES_ELIMINAR } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import Aside from '../../../Layout/Aside';
import axios from 'axios';
import Swal from 'sweetalert2';

const MainOperaciones = () => {
    const token = useAuthStore((state) => state.token);
  const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();//objeto que se importa de useStockStore
  const [filtrado, setFiltrado] = useState('');
  const [datos, setDatos] = useState([]);

  const getOperaciones = async () => {
    try {
      const response = await axios.get(URL_OPERACIONES, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data)
      setDatos(response.data);
    } catch (error) {
      console.error('Error al obtener la operacion:', error);
    }
  };
  
// borrado logico
  const handleEliminarOperacion = async (operacion) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la operacion ${operacion.nombreOperacion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.put(
          `${URL_OPERACIONES_ELIMINAR}${operacion.id_operacion}`,
          { ...operacion }, // Se envía el stock con el campo "eliminado" en true
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Eliminado!', 'La operacion ha sido eliminado correctamente.', 'success');
        getOperaciones(); 
      } catch (error) {
        console.error('Error al eliminar la operacion:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar la operacion.', 'error');
      }
    }
  };

  const columns = [
    { header: 'Nº', accessorKey: 'id_operacion' },
    { header: 'Operacion', accessorKey: 'nombreOperacion' },
    { header: 'Tipo', accessorKey: 'tipoOperacion' },
    { header: 'Monto', accessorKey: 'montoOperacion' },
    { header: 'Detalle', accessorKey: 'detalleOperacion' },
    { header: 'Fecha', accessorKey: 'fechaOperacion' },

    {
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => setRegistroSeleccionado(row.original)}
            className="bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"
          >
            Editar
          </button>
          <button
            onClick={() => handleEliminarOperacion(row.original)}
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
    getOperaciones();
  }, []);

  return (
    <div>
      <p className="text-black font-semibold text-4xl display flex justify-center m-5">Registros de Operaciones</p>
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
          Registrar Operacion
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
      <div className="btn-pages">
        <button className="position relative top-1 m-2 p-2 bg-zinc-900 text-white h-12 rounded-[8px] font-semibold text-[16px]" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Página Anterior
        </button>
        <button className=" position relative top-1 m-2 p-2 bg-zinc-900 text-white h-12 rounded-[8px] font-semibold text-[16px]" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Página Siguiente
        </button>
      </div>
      </div>
  )
}

export default MainOperaciones
