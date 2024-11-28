import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import EditarPendiente from './EditarPendiente';
import CrearPendiente from './CrearPendiente';
import '../../../../Styles/table.css';
import { URL_PENDIENTES, URL_PENDIENTES_ELIMINAR } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import Aside from '../../../Layout/Aside';
import axios from 'axios';
import Swal from 'sweetalert2';
import VerPendiente from './VerPendiente';
const MainPendiente = () => {

  const token = useAuthStore((state) => state.token);
  const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();

  const [filtrado, setFiltrado] = useState('');
  const [datos, setDatos] = useState([]);

  const getPendientes = async () => {
    try {
      const response = await axios.get(URL_PENDIENTES, { headers: { Authorization: `Bearer ${token}` } });
      setDatos(response.data);
    } catch (error) {
      console.error('Error al obtener pendientes:', error);
    }
  };
  
// borrado logico
  const handleEliminarPendiente = async (pendiente) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el pendiente?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.put(
          `${URL_PENDIENTES_ELIMINAR}${pendiente.id_pendiente}`,
          { ...pendiente },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Eliminado!', 'El pendiente ha sido eliminado correctamente.', 'success');
        getPendientes(); 
      } catch (error) {
        console.error('Error al eliminar el pendiente:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el pendiente.', 'error');
      }
    }
  };

    const columns = [
      { header: 'Nº', accessorKey: 'id_pendiente' },
      { header: 'Descripcion', accessorKey: 'Descripcion' },
      { header: 'Estado', accessorKey: 'estado' },
      { header: 'Fecha de Creacion', accessorKey: 'fechaCreacion' },
      { header: 'Fecha Limite', accessorKey: 'fechaLimite' },
      { header: 'Prioridad', accessorKey: 'prioridad' },
      {
        header: 'Acciones',
        cell: ({ row }) => (
<div className="flex gap-2">
          <button
            onClick={() => setRegistroSeleccionado(row.original)}
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
            onClick={() => handleEliminarPendiente(row.original)}
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
      getPendientes();
    }, []);
  
    return (
<div>
      <p className="text-black font-semibold text-4xl display flex justify-center m-5">Registros de Pendientes</p>
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
          Registrar Pendiente
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
      <EditarPendiente onPendienteEditado={getPendientes} />
      <CrearPendiente onPendienteRegistrado={getPendientes} />
      <VerPendiente onPendientesVer={getPendientes} />
      </div>
    );
  }

export default MainPendiente
