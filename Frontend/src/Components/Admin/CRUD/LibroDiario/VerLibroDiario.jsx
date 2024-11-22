import { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { URL_LIBRO_DIARIO } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import Aside from '../../../Layout/Aside';

const VerLibroDiario = () => {
  const token = useAuthStore((state) => state.token);
  const userRole = useAuthStore((state) => state.userRole);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [fechaRegistro, setFechaRegistro] = useState(''); // Fecha actual en formato YYYY-MM-DD
  const [filtrado, setFiltrado] = useState(''); // Para filtrar los datos de la tabla
  const [datos, setDatos] = useState([]); // Datos de la tabla
  const [idfront, setIdfront] = useState(0); // id del usuario logueado

  // Obtener la fecha actual en formato YYYY-MM-DD
  useEffect(() => {
    const date = new Date();
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    setFechaRegistro(`${año}-${mes}-${dia}`);
  }, []);

  // Función para obtener los datos del libro diario
  const getLibroDiario = async () => {
    if (!token) {
      console.warn('Token no disponible. La petición no se ejecutará.');
      return;
    }

    try {
      const response = await axios.post(
        URL_LIBRO_DIARIO,
        { fechaRegistro },
        { headers: { authorization: `Bearer ${token}` } }
      );

      // Agregar idfront autoincremental
      const dataConIdFront = response.data.map((item, index) => ({
        ...item,
        idfront: index + 1, // Asignar índice autoincremental
      }));

      setDatos(dataConIdFront);
    } catch (error) {
      console.error('Error al obtener el libro diario:', error);
    }
  };

  const handleLogout = () => {
    clearAuth();
  };

  // Llamada inicial al montar el componente y cada vez que cambie fechaRegistro o token
  useEffect(() => {
    if (fechaRegistro && token) {
      getLibroDiario();
    }
  }, [fechaRegistro, token]);

  // Configuración de las columnas para la tabla
  const columns = [
    { header: 'Nº', accessorKey: 'idfront' },
    { header: 'Fecha', accessorKey: 'fechaRegistro' },
    { header: 'Descripción', accessorKey: 'descripcion' },
    { header: 'Tipo', accessorKey: 'tipo' },
    { header: 'Monto', accessorKey: 'monto' },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <Button onClick={() => console.log('Editar:', row.original.id)}>
          Editar
        </Button>
      ),
    },
  ];

  // Configuración de la tabla con React Table
  const table = useReactTable({
    data: datos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtrado,
    },
    onGlobalFilterChange: setFiltrado,
  });

  return (
    <div>
      <h3 className="text-white text-opacity-50">Visualizando el Libro Diario</h3>
      <div className="input-search">
        <input
          className="text-black"
          type="search"
          placeholder="Buscador"
          value={filtrado}
          onChange={(e) => setFiltrado(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="fecha">Seleccionar Fecha:</label>
        <input
          type="date"
          id="fecha"
          className="text-black"
          value={fechaRegistro}
          onChange={(e) => setFechaRegistro(e.target.value)}
        />
        <br />
        <br />
      </div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Aside />
      <Button onClick={handleLogout} className="btn btn-secondary">
        Cerrar Sesión
      </Button>
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
