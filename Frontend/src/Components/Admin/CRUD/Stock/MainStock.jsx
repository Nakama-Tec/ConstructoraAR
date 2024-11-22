import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import '../../../../Styles/table.css';
import { URL_STOCK, URL_STOCK_ELIMINAR } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import useStockStore from '../../../../Context/useStockStore';
import Aside from '../../../Layout/Aside';
import axios from 'axios';
import Swal from 'sweetalert2';

const MainStock = () => {
  const token = useAuthStore((state) => state.token);
  const { setStockSeleccionado, openRegistroModal } = useStockStore();//objeto que se importa de useStockStore
  const [filtrado, setFiltrado] = useState('');
  const [datos, setDatos] = useState([]);

  const getStock = async () => {
    try {
      const response = await axios.get(URL_STOCK, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data)
      setDatos(response.data);
    } catch (error) {
      console.error('Error al obtener stock de materiales:', error);
    }
  };
  
// borrado logico
  const handleEliminarStock = async (stock) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el stock del material "${stock.patenteVehiculo}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.put(
          `${URL_STOCK_ELIMINAR}${stock.id_vehiculo}`,
          { ...stock }, // Se envía el stock con el campo "eliminado" en true
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Eliminado!', 'El stock del material ha sido eliminado correctamente.', 'success');
        getStock(); 
      } catch (error) {
        console.error('Error al eliminar stock:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el stock.', 'error');
      }
    }
  };

  const columns = [
    { header: 'Nº', accessorKey: 'id_stock' },
    { header: 'Nombre Material', accessorKey: 'nombreMaterial' },
    { header: 'Ubicacion', accessorKey: 'ubicacionStock' },
    { header: 'Cantidad', accessorKey: 'cantidadStock' },
    { header: 'Disponible', accessorKey: 'activoStock' },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => setStockSeleccionado(row.original)}
            className="bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"
          >
            Editar
          </button>
          <button
            onClick={() => handleEliminarStock(row.original)}
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
    getStock();
  }, []);

  return (
    <div>
      <p className="text-black font-semibold text-4xl display flex justify-center m-5">Registros del Stock de Materiales</p>
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
          Registrar Stock del Material
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

export default MainStock
