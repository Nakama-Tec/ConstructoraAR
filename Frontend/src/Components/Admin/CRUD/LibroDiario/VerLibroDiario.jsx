import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { URL_LIBRO_DIARIO } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import Aside from '../../../Layout/Aside';

const VerLibroDiario = () => {
  const token = useAuthStore((state) => state.token); 
  const userRole = useAuthStore((state) => state.userRole); // Para obtener el rol del usuario logueado
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [filtrado, setFiltrado] = useState('');
  const [datos, setDatos] = useState([]);

  // Obtener la fecha actual en formato YYYY-MM-DD
  useEffect(() => {
    let date = new Date();
    let año = date.getFullYear();
    let mes = date.getMonth() + 1;
    let dia = date.getDate();
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;

    setFechaRegistro(`${año}-${mes}-${dia}`); // Formato adecuado para la base de datos
  }, []);

  // Función para obtener los datos del libro diario
  const getLibroDiario = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL_LIBRO_DIARIO, { fechaRegistro }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDatos(response.data); // Asumiendo que la respuesta contiene los datos del libro diario
    } catch (error) {
      console.error("Error al obtener el libro diario:", error);
    }
  };

  const columns = [
    { header: 'Nº', accessorKey: 'id_cliente' },
    { header: 'Fecha', accessorKey: 'nombreCliente' },
    { header: 'Descripcion', accessorKey: 'condicionCliente' },
    { header: 'Tipo', accessorKey: 'direccionCliente' },
    { header: 'Ingreso', accessorKey: 'cuilCliente' },
    { header: 'Egreso', accessorKey: 'telefonoCliente' },
    { header: 'Saldo', accessorKey: 'mailCliente' },
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
    getLibroDiario(); // Llamar a la función al montar el componente
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
        <br /><br />
        <label htmlFor="">{fechaRegistro}</label>
        <br /><br />
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
      <Aside/>
      <div className="btn-pages">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Página Anterior
        </button>
        <span>{`Página ${table.getState().pagination.pageIndex + 1} de ${table.getPageCount()}`}</span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Página Siguiente
        </button>
      </div>
    </div>
  );
};

export default VerLibroDiario;
