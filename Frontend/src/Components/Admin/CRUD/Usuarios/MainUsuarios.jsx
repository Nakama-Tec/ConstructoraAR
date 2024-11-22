import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../../../../Styles/table.css';
import { URL_USUARIOS } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';

const MainUsuarios = () => {
    const token = useAuthStore((state) => state.token); 
    const userRole = useAuthStore((state) => state.userRole);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    
    const [filtrado, setFiltrado] = useState('');
    const [datos, setDatos] = useState([]);
  
  
    const getUsuarios = async () => {
      try {
        const response = await axios.get(URL_USUARIOS, { headers: { Authorization: `Bearer ${token}` } });
        console.log(response.data)
        setDatos(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
  
    const columns = [
      { header: 'Nº Usuario', accessorKey: 'id_usuario' },
      { header: 'Nº Empleado', accessorKey: 'id_Empleado' },
      { header: 'Nombre de Usuario', accessorKey: 'nombreUsuario' },
      { header: 'Mail de Usuario', accessorKey: 'mailUsuario' },
      { header: 'Contraseña', accessorKey: 'passwordUsuario' },
      { header: 'Rol', accessorKey: 'rol' },
      {
        header: 'Acciones',
        cell: ({ row }) => (
          <Button onClick={() => console.log("Editar:", row.original.id_usuario)} className='bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"'>
            Editar Usuario
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
      getUsuarios();
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
  

export default MainUsuarios
