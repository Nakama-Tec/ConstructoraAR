import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../../../../Styles/table.css';
import { URL_CLIENTES } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import Aside from '../../../Layout/Aside';

const MainClientes = () => {

  const token = useAuthStore((state) => state.token);

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

  const columns = [
    { header: 'Nº', accessorKey: 'id_cliente' },
    { header: 'Nombre', accessorFn: row => `${row.nombreCliente} ${row.apellidoCliente}` },
    { header: 'Condición', accessorKey: 'condicionCliente' },
    { header: 'CUIL', accessorKey: 'cuilCliente' },
    { header: 'Teléfono', accessorKey: 'telefonoCliente' },
    { header: 'Mail', accessorKey: 'mailCliente' },
    { header: 'Dirección', accessorKey: 'direccionCliente' },
    { header: 'Garantes', accessorKey: 'datosGarantes' },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <Button onClick={() => console.log("Editar:", row.original.id_cliente)} className='bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"'>
          Editar Cliente
        </Button>
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
      <h3 className="text-white text-opacity-50">Visualizando los Pagos</h3>
      <div className="input-search">
        <input
          className="text-black"
          type="search"
          placeholder="Buscador"
          value={filtrado}
          onChange={(e) => setFiltrado(e.target.value)}
        />
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
        <button className='m-2 p-2 bg-zinc-900 text-white h-12 rounded-[8px] font-semibold text-[16px]' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Página Anterior
        </button>
        <button className='m-2 p-2 bg-zinc-900 text-white h-12 rounded-[8px] font-semibold text-[16px]' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Página Siguiente
        </button>
      </div>
    </div>
  );
}

export default MainClientes;
