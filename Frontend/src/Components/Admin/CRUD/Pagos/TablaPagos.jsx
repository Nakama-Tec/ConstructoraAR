import {useState,useEffect} from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import data from '../../../../../MOCK_DATA.json';
import Button from 'react-bootstrap/Button';
import '../../../../Styles/table.css';
import axios from 'axios';
import { URL_CLIENTES } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';


const TablaPagos = () => {

  const token = useAuthStore((state) => state.token); // esto es necesario para generar el token y ver usuarios admin tengan previlegios
  const userRole = useAuthStore((state) => state.userRole); // useRole es una funcion que se usa para ver si el usuario es admin
  const clearAuth = useAuthStore((state) => state.clearAuth); // clearAuth es una funcion que se usa para cerrar sesion
  const [filtrado, setFiltrado] = useState('');

// const initialState = {
//     id_cliente: '',
//     nombreCliente: "",
//     condicionCliente: "",
//     cuilCliente: "",
//     telefonoCliente: "",
//     mailCliente: "",
//     direccionCliente: "",
//     datosGarantes: "",
//     activoCliente: ""
// }

const [datos, setDatos] = useState([])

const getClientes =async() =>{

try {

  const response = await axios.get(URL_CLIENTES, {  headers: { Authorization: `Bearer ${token}` } }); 
  console.log(response.data);
  setDatos(response.data);
} catch (error) {
  console.log(error);
}
}

    const columns = [
      { header: 'Nº', accessorKey: 'id_cliente' },
      { header: 'Nombre', accessorKey: 'nombreCliente' },
      { header: 'Condicion', accessorKey: 'condicionCliente' },
      { header: 'CUIL', accessorKey: 'cuilCliente' },
      { header: 'Telefono', accessorKey: 'telefonoCliente' },
      { header: 'Mail', accessorKey: 'mailCliente' },
      { header: 'Direccion', accessorKey: 'direccionCliente' },
      { header: 'Garantes', accessorKey: 'datosGarantes' }, 
     
      {
        header: 'ACCIONES',
        cell: ({ row }) => (
          <Button
            // onClick={() => handleEditClick(row.original.id)}
            // className="bg-white"
          >
            Editar Pago
          </Button>
        )
      }
    ];
  
    const table = useReactTable({
      datos,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        globalFilter: filtrado
      },
      onGlobalFilterChange: setFiltrado
    });
  
useEffect(() => {getClientes()},[])

    return (
      <div>
        <h3 className='text-white text-opacity-50'>Visualizando los Pagos</h3>
        <br />
        <div className='input-search'>
        <input
          className='text-black'
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

export default TablaPagos
