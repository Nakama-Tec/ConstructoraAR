import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Aside from '../../../Layout/Aside';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import data from '../../../../../MOCK_DATA.json';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { URL_LIBRO_DIARIO } from '../../../../Constants/endpoints-API';
import '../../../../Styles/table.css';


const VerLibroDiario = () => {


  const MySwal = withReactContent(Swal);
  const navigate = useNavigate()

  const initialState = {
    operacion: "",
    tipo: "",
    descripcion: "",
    ingreso: 0,
    egreso:0,
    saldo: 0,
    total: 0
}
  const [filtrado, setFiltrado] = useState('');
  const [registro, setRegistro] = useState(initialState)

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


  // LIBRO DIARIO MODAL

  const handleChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value })
}

  const handleAgregarRegistro = () => {

    MySwal.fire({
        title: 'COMPLETA LOS CAMPOS',
        html: `
    <input type="text" name="operacion" class="swal2-input" onChange={handleChange} placeholder="Operacion">
    <input type="text" name="tipo" class="swal2-input" onChange={handleChange} placeholder="Tipo">
    <input type="text" name="descripcion" class="swal2-input" onChange={handleChange} placeholder="Descripcion">
    <input type="text" name="ingreso" class="swal2-input" onChange={handleChange} placeholder="Ingreso">
    <input type="text" name="egreso" class="swal2-input" onChange={handleChange} placeholder="Egreso">
    <input type="text" name="saldo" class="swal2-input" onChange={handleChange} placeholder="Saldo">
    <input type="text" name="total" class="swal2-input" onChange={handleChange} placeholder="Total">

  `,
  showCloseButton: true,
        preConfirm: () => {
          try {

            let response = axios.post(URL_LIBRO_DIARIO, {
                operacion: registro.operacion,
                tipo: registro.tipo,
                descripcion: registro.descripcion,
                ingreso: registro.ingreso,
                egreso: registro.egreso,
                saldo: registro.saldo,
                total: registro.total
            })

            if (response.status === 200) {
                navigate('/LibroDiario')
            }
        } catch (error) {
            console.log(error)
        }
        },
      })
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
        <Button onClick={() => handleAgregarRegistro()} >AGREGAR REGISTRO</Button>
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