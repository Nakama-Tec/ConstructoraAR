import Aside from '../../../Layout/Aside';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import data from '../../../../../MOCK_DATA.json';
import '../../../../Styles/table.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import EditarCliente from '../Clientes/EditarClientes';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';



const VerLibroDiario = () => {

  const [filtrado, setFiltrado] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);

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
          onClick={() => handleEditClick(row.original.id)}
          className="bg-white"
        >
          Editar Cliente
        </Button>
      )
    }
  ];

  const handleEditClick = (id) => {
    setSelectedClienteId(id); // Establece el ID seleccionado
    setShowAlert(true); // Muestra el modal
    <EditarCliente/>
  };

  const handleEditarCliente = () => {
    // Realiza la acción de guardado aquí si es necesario
    setShowAlert(false); // Cierra el modal
  };

  const hideAlert = () => {
    setShowAlert(false); // Oculta el modal
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
    <>
    <div className='inicio'>
      <button>VOLVER AL INICIO</button>
    </div>
      <div className='opciones'>
      <label>SELECCIONA FECHA </label>
      <input type='date'/>
      <button>FLUJO DE CAJA</button>
      <button>PENDIENTES</button>
      </div>
      <hr />
      <h2 className='title-diario'>LIBRO DIARIO</h2>
      <hr />
      <div className='buttons'>
        <div>
        <Button>AGREGAR PAGO</Button>
        </div>
        <div>
        <Button>VER PAGOS</Button>
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
    </div>

    <div className='btn-pages'>
      <button className='m-2 p-2 bg-slate-800 text-white h-12 rounded-[8px] font-semibold text-[16px]' onClick={() => table.previousPage()}>Página Anterior</button>
      <button className='m-2 p-2 bg-slate-800 text-white h-12 rounded-[8px] font-semibold text-[16px]' onClick={() => table.nextPage()}>Página Siguiente</button>
    </div>
    <SweetAlert
        show={showAlert}
        title="Editar Cliente"
        onCancel={hideAlert}
        showCancel
        confirmBtnText="Guardar"
        cancelBtnText="Cancelar"
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        closeOnClickOutside={false}
        className="modal"
      >
         <EditarCliente id={selectedClienteId} onSave={handleEditarCliente} />
      </SweetAlert>
    </>
  )
}

export default VerLibroDiario
