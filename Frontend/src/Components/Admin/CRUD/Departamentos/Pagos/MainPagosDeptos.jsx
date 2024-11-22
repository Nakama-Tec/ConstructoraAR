import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../../../../../Styles/table.css';
import { URL_PAGOS_ALQUILERES } from '../../../../../Constants/endpoints-API';
import useAuthStore from '../../../../../Context/useAuthStore';


const MainPagosDeptos = () => {

    const token = useAuthStore((state) => state.token); 
    
    const [filtrado, setFiltrado] = useState('');
    const [datos, setDatos] = useState([]);
  
  
    const getTerrenos = async () => {
      try {
        const response = await axios.get(URL_PAGOS_ALQUILERES, { headers: { Authorization: `Bearer ${token}` } });
        console.log(response.data)
        setDatos(response.data);
      } catch (error) {
        console.error("Error al obtener terrenos:", error);
      }
    };
  
    const columns = [
        { header: 'Nº', accessorKey: 'id_pagoAlquiler' },
        { header: 'Nombre Departamento', accessorKey: 'NombreDepartamento' },
        { header: 'Monto Pagado', accessorKey: 'MontoPagoAlquiler' },
        { header: 'Cliente', accessorFn: row => `${row.NombreCliente} ${row.ApellidoCliente}` },
        { header: 'Fecha del Pago', accessorKey: 'FechaPagoAlquiler' },
      {
        header: 'Acciones',
        cell: ({ row }) => (
          <Button onClick={() => console.log("Editar:", row.original.id_terreno)} className='bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"'>
            Editar
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
      getTerrenos();
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

export default MainPagosDeptos
