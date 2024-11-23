import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import axios from 'axios';
import Swal from 'sweetalert2';
import Aside from '../../../Layout/Aside';
import useRegistroStore from '../../../../Context/useRegistroStore';
import '../../../../Styles/table.css';
import { URL_VIAJES, URL_VIAJES_ELIMINAR } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import EditarViaje from './EditarViajes';
import CrearViajes from './CrearViajes';

const MainViajes = () => {
    const token = useAuthStore((state) => state.token);

    const [filtrado, setFiltrado] = useState('');
    const [datos, setDatos] = useState([]);
    const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();

  
  
    const getViajes = async () => {
      try {
        const response = await axios.get(URL_VIAJES, { headers: { Authorization: `Bearer ${token}` } });
        console.log("Viajes:", response.data);
        setDatos(response.data);
      } catch (error) {
        console.error("Error al obtener viajes:", error);
      }
    };
  

    const handleEliminarViaje = async (viaje) => {
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar este viaje ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
  
      if (confirmacion.isConfirmed) {
        try {
          await axios.put(
            `${URL_VIAJES_ELIMINAR}${viaje.id_viaje}`,
            { ...viaje },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          Swal.fire('Eliminado!', 'El viaje ha sido eliminado correctamente.', 'success');
          getViajes(); 
        } catch (error) {
          console.error('Error al eliminar viaje:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el viaje.', 'error');
        }
      }
    };


    const columns = [
      { header: 'Nº Viaje', accessorKey: 'id_viaje' },
      { header: 'Nº Vehiculo', accessorKey: 'id_vehiculo' },
      { header: 'Nº Obra', accessorKey: 'id_obra' },
      { header: 'Fecha Viaje', accessorKey: 'fechaViaje' },
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
            onClick={() => handleEliminarViaje(row.original)}
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
      getViajes();
    }, []);
  
    return (
      <div>
      <p className="text-black font-semibold text-4xl display flex justify-center m-5">Registros de Viajes</p>
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
          Registrar Viajes
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
      <EditarViaje onViajeEditado={getViajes} />
      <CrearViajes onViajeRegistrado={getViajes} />
      </div>
  );
};
export default MainViajes;
