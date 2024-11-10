import Aside from '../../../Layout/Aside'
import {useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'
import data from '../../../../../MOCK_DATA.json'
import '../../../../Styles/table.css'
import { useState } from 'react'
const MainClientes = () => {

  const [filtering, setFiltering] = useState("")

  const columns = [
    {
      header: 'ID', // Encabezado de la columna
      accessorKey: 'id' // Llave de acceso a los datos
    },
    {
      header: 'Nombres y Apellidos',
      accessorFn: row => `${row.nombre} ${row.apellido}` // Función de acceso a los datos
    },
    // {
    //   header: 'Nombre',
    //   accessorKey: 'nombre'
    // },
    // {
    //   header: 'Apellido',
    //   accessorKey: 'apellido'
    // },
    {
      header: 'Correo Electronico',
      accessorKey: 'correo'
    },
    {
      header: 'Telefono',
      accessorKey: 'telefono'
    },
    {
      header: 'Fecha de Nacimiento',
      accessorKey: 'fechaNacimiento'
    }
  ]

  const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getFilteredRowModel: getFilteredRowModel(), state: {
    globalFilter: filtering
  },
  onGlobalFilterChange: setFiltering
})
  
    return (
      <>
      <div className='input-search'>
        <input type='text' placeholder='Buscador' value={filtering} onChange={(e) => setFiltering(e.target.value)}/>
      </div>

      <div className='mainClientes'>
        <div className='Aside'>
      <Aside />
        </div>

      <table>
        <thead>
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {
                      flexRender(header.column.columnDef.header, header.getContext())
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    }
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
      <div className='btn-pages'>        
          <button onClick={() => table.nextPage()}>
          Página Siguiente
          </button>

          <button onClick={() => table.previousPage()}>
          Página Anterior
          </button>
      </div>
      </>
  );
}

export default MainClientes
