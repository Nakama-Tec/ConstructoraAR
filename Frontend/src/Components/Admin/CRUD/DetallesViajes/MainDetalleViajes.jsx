import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import axios from 'axios';
import Swal from 'sweetalert2';
import Aside from '../../../Layout/Aside';
import useRegistroStore from '../../../../Context/useRegistroStore';
import '../../../../Styles/table.css';
import { URL_DETALLES_VIAJES,  URL_DETALLES_VIAJES_ELIMINAR } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import userDetalleStore from '../../../../Context/userDetalleStore';
// import VerViajes from '../Viajes/VerViajes';
import VerDetallesViajes from './VerDetallesViajes';
// import EditarViaje from './EditarViajes';
// import CrearViajes from './CrearViajes';

const MainDetalleViajes = () => {
    const token = useAuthStore((state) => state.token);

    const [filtrado, setFiltrado] = useState('');
    const [datos, setDatos] = useState([]);
    const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();
    const { setDetalleRegistroSeleccionado, openDetalleRegistroModal } = useRegistroStore();

  
  
    const getDetalleViajes = async () => {
      try {
        const response = await axios.get(URL_DETALLES_VIAJES, { headers: { Authorization: `Bearer ${token}` } });
        setDatos(response.data);
      } catch (error) {
        console.error("Error al obtener el detalle del viaje:", error);
      }
    };
  

    const handleEliminarDetalleViaje = async (detalle) => {
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
            `${URL_DETALLES_VIAJES_ELIMINAR}${detalle.id_DetallesViaje}`,
            { ...detalle },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          Swal.fire('Eliminado!', 'El Detalle del viaje ha sido eliminado correctamente.', 'success');
          getDetalleViajes(); 
        } catch (error) {
          console.error('Error al eliminar detalle viaje:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el detalle del viaje.', 'error');
        }
      }
    };


    const columns = [
      { header: 'Nº Detalle Viaje', accessorKey: 'ID' },
      { header: 'Obra', accessorKey: 'Obra' },
      { header: 'Direccion de Obra', accessorKey: 'Direccion_Obra' },
      { header: 'Fecha Viaje', accessorKey: 'Fecha_Viaje' },
      { header: 'Patente', accessorKey: 'Patente' },
      { header: 'Tipo Vehiculo', accessorKey: 'Tipo_Vehiculo' },
      { header: 'Material', accessorKey: 'Material' },
      { header: 'Deposito', accessorKey: 'Deposito' },
      { header: 'Cantidad Material', accessorKey: 'Cantidad_Material' },
      {
        header: 'Acciones',
        cell: ({ row }) => (
          
          <div className="flex gap-2">
           
           <button onClick={() => setRegistroSeleccionado(row.original)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-800 active:bg-blue-900 focus:outline-none" >
            Ver más
          </button>

          <button
            onClick={() => setRegistroSeleccionado(row.original)}
            className="bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"
          >
            Editar
          </button>
          <button
            onClick={() => handleEliminarDetalleViaje(row.original)}
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
      getDetalleViajes();
    }, []);
  
    return (
      <div>
      <p className="text-black font-semibold text-4xl display flex justify-center relative top-12 m-5">Detalles de los Viajes</p>
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
          Registrar detalles de viajes
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
      {/* <EditarDetalleViaje onDetalleViajeEditado={getDetalleViajes} /> */}
      {/* <CrearDetalleViajes onDetalleViajeRegistrado={getDetalleViajes} /> */}
      <VerDetallesViajes onDetalleViaje={getDetalleViajes} />
      </div>
  );
};

export default MainDetalleViajes
