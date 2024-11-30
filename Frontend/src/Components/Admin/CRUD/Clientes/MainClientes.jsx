import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import EditarCliente from './EditarClientes';
import CrearCliente from './CrearClientes';
import VerClientes from './VerClientes';
import '../../../../Styles/table.css';
import { URL_CLIENTES, URL_CLIENTES_ELIMINAR } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';
import Aside from '../../../Layout/Aside';
import axios from 'axios';
import Swal from 'sweetalert2';

const MainClientes = () => {

  const token = useAuthStore((state) => state.token);
  const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();
  const {setVerRegistroSeleccionado} = useVerRegistroStore();

  const [filtrado, setFiltrado] = useState('');
  const [datos, setDatos] = useState([]);


  const getClientes = async () => {
    try {
      const response = await axios.get(URL_CLIENTES, { headers: { Authorization: `Bearer ${token}` } });
      setDatos(response.data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

// borrado logico
const handleEliminarCliente = async (cliente) => {
  const confirmacion = await Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Deseas eliminar al cliente "${cliente.nombreCliente} ${cliente.apellidoCliente}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (confirmacion.isConfirmed) {
    try {
      await axios.put(
        `${URL_CLIENTES_ELIMINAR}${cliente.id_cliente}`,
        { ...cliente },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire('Eliminado!', 'El cliente ha sido eliminado correctamente.', 'success');
      getClientes(); 
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al eliminar el cliente.', 'error');
    }
  }
};

  const columns = [
    { header: 'Nº', accessorKey: 'id_cliente' },
    { header: 'Nombre y Apellido', accessorFn: row => `${row.nombreCliente} ${row.apellidoCliente}` },
    { header: 'Condición', accessorKey: 'condicionCliente' },
    { header: 'CUIL', accessorKey: 'cuilCliente' },
    { header: 'Teléfono', accessorKey: 'telefonoCliente' },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2">
                    <button
            onClick={() => setVerRegistroSeleccionado(row.original)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-800 active:bg-blue-900 focus:outline-none"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
    </button>

          <button
            onClick={() => setRegistroSeleccionado(row.original)}
            className="bg-yellow-500 flex text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
          </button>
          <button
            onClick={() => handleEliminarCliente(row.original)}
            className="bg-red-600 flex text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-red-800 active:bg-red-900 focus:outline-none"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>


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
    getClientes();
  }, []);

  return (
<div>
      <p className="text-black font-semibold text-4xl display flex justify-center m-5">Registros de Clientes</p>
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
          className="bg-green-600 flex text-white px-4 py-2 m-2 rounded-full transition duration-200 ease-in-out hover:bg-green-800 active:bg-green-900 focus:outline-none position relative left-64"
        >

          Registrar Cliente
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 relative left-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>


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
      <EditarCliente onClienteEditado={getClientes} />
      <CrearCliente onClienteRegistrado={getClientes} />
      <VerClientes onClienteVer={getClientes} />
      </div>
  );
}

export default MainClientes;
