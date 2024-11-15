import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../../../../Styles/table.css';
import { URL_CLIENTES } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';

const TablaPagos = () => {
  const token = useAuthStore((state) => state.token); 
  const userRole = useAuthStore((state) => state.userRole);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  
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
    { header: 'Nombre', accessorKey: 'nombreCliente' },
    { header: 'Condición', accessorKey: 'condicionCliente' },
    { header: 'CUIL', accessorKey: 'cuilCliente' },
    { header: 'Teléfono', accessorKey: 'telefonoCliente' },
    { header: 'Mail', accessorKey: 'mailCliente' },
    { header: 'Dirección', accessorKey: 'direccionCliente' },
    { header: 'Garantes', accessorKey: 'datosGarantes' },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <Button onClick={() => console.log("Editar:", row.original.id_cliente)}>
          Editar Pago
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
      <div className="btn-pages">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Página Anterior
        </button>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Página Siguiente
        </button>
      </div>
    </div>
  );
};

export default TablaPagos;
