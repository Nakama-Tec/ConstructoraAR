import { useState } from 'react';
import Aside from '../../../Layout/Aside';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import data from '../../../../../MOCK_DATA.json';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import TablaPagos from '../Pagos/TablaPagos';
import Button from 'react-bootstrap/Button';
import '../../../../Styles/table.css';


const VerLibroDiario = () => {


  const MySwal = withReactContent(Swal);

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
        <button
        className='bg-neutral-900 text-white text-bold border-none p-2 rounded-[8px]'
          // onClick={() => handleEditClick(row.original.id)}
          // className="bg-white"
        >
          Editar Operacion
        </button>
      ),
    }
  ];


  // PAGOS MODAL

  const handleVerPagos = () => {
    MySwal.fire({
      title: 'TABLA PAGOS', // Muestra el titulo del MODAL
      html: <TablaPagos />, // Muestra el componente TablaPagos
      showCloseButton: true, // Muestra el boton de cerrar
      showConfirmButton: false, // Muestra el boton de confirmar (False para que no aparezca)
      width: 1800, // Ancho del MODAL
      background: '#1c1c1c', // Color de fondo del MODAL
      color: 'white', // Color del texto del MODAL
    });
  };

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
    <div className='bg-neutral-400 m-0 p-0'>
    <div className='inicio m-0 p-5'>
      <button>VOLVER AL INICIO</button>
    </div>
      <div className='opciones'>
      <label className='text-bold text-black'>SELECCIONA FECHA </label>
      <input type='date'/>
      <button>FLUJO DE CAJA</button>
      <button>PENDIENTES</button>
      </div>
      <hr />
      <h2 className='text-black text-[55px] text-bold flex justify-center'>LIBRO DIARIO</h2>
      <hr />
      <div className='buttons'>
        <div>
        <Button>AGREGAR PAGO</Button>
        </div>
        <div>
        <Button onClick={() => handleVerPagos()}
          className="bg-white">VER PAGOS</Button>
        </div>
      </div>
      <div className='input-search'>
      <input
        type='search'
        placeholder='Buscador'
        value={filtrado}
        onChange={(e) => setFiltrado(e.target.value)}
      />
    </div>
    <div className='mainClientes'>
      <div className='Aside'>
        <Aside />
      </div>
      <table className='text-white text-bold'>
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

    <div className='btn-pages'>
      <button className='m-2 p-2 bg-zinc-900 text-white h-12 rounded-[8px] font-semibold text-[16px]' onClick={() => table.previousPage()}>Página Anterior</button>
      <button className='m-2 p-2 bg-zinc-900 text-white h-12 rounded-[8px] font-semibold text-[16px]' onClick={() => table.nextPage()}>Página Siguiente</button>
    </div>
    </div>
  )
}

export default VerLibroDiario