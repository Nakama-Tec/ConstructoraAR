import {useState} from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import data from '../../../../../MOCK_DATA.json';
import Button from 'react-bootstrap/Button';
import '../../../../Styles/table.css';

const EditarClientes = () => {

  const [filtrado, setFiltrado] = useState('');

  const columns = [
    { header: 'Nº', accessorKey: 'id' },
    { header: 'OPERACION', accessorKey: 'operacion' },
    { header: 'TIPO', accessorKey: 'tipo' },
    { header: 'DESCRIPCION', accessorKey: 'descripcion' },
    { header: 'INGRESO', accessorKey: 'ingreso' },
    { header: 'EGRESO', accessorKey: 'egreso' },
    { header: 'SALDO', accessorKey: 'saldo' },
    { header: 'TOTAL', accessorKey: 'total' },
    {
      header: 'ACCIONES',
      cell: ({ row }) => (
        <Button
          // onClick={() => handleEditClick(row.original.id)}
          // className="bg-white"
        >
          Editar Cliente
        </Button>
      )
    }
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtrado
    },
    onGlobalFilterChange: setFiltrado
  });

  return (
    <div>
      <h3>TABLA PAGOS</h3>
      <br />
      <div className='input-search'>
      <input
        type='search'
        placeholder='Buscador'
        value={filtrado}
        onChange={(e) => setFiltrado(e.target.value)}
      />
    </div>
    <br />
      <table>
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
      <div className='btn-pages'>
      <button className='m-2 p-2 bg-slate-800 text-white h-12 rounded-[8px] font-semibold text-[16px]' onClick={() => table.previousPage()}>Página Anterior</button>
      <button className='m-2 p-2 bg-slate-800 text-white h-12 rounded-[8px] font-semibold text-[16px]' onClick={() => table.nextPage()}>Página Siguiente</button>
    </div>
    </div>
  )
}

export default EditarClientes
