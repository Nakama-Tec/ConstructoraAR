import Aside from '../../../Layout/Aside';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import data from '../../../../../MOCK_DATA.json';
import '../../../../Styles/table.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import EditarCliente from './EditarClientes';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

const MainClientes = () => {
  const [filtrado, setFiltrado] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);

  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Nombres y Apellidos', accessorFn: row => `${row.nombre} ${row.apellido}` },
    { header: 'Correo Electronico', accessorKey: 'correo' },
    { header: 'Telefono', accessorKey: 'telefono' },
    { header: 'Fecha de Nacimiento', accessorKey: 'fechaNacimiento' },
    {
      header: 'Acciones',
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

  const handleEditClick = (id) => {
    setSelectedClienteId(id); // Establece el ID seleccionado
    setShowAlert(true); // Muestra el modal
  };

  const handleEditarCliente = () => {
    // Realiza la acción de guardado aquí si es necesario
    setShowAlert(false); // Cierra el modal
  };

  const hideAlert = () => {
    setShowAlert(false); // Oculta el modal
  };

  return (
    <>
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
        <button onClick={() => table.previousPage()}>Página Anterior</button>
        <button onClick={() => table.nextPage()}>Página Siguiente</button>
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
  );
};

export default MainClientes;
