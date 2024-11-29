import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import '../../../../Styles/table.css';
import { URL_EMPLEADOS,URL_EMPLEADOS_ELIMINAR } from '../../../../Constants/endpoints-API';
import CrearEmpleado from './CrearEmpleados';
import EditarEmpleado from './EditarEmpleados';
import VerEmpleados from './VerEmpleados';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';
import Aside from '../../../Layout/Aside';
import axios from 'axios';
import Swal from 'sweetalert2';

const MainEmpleados = () => {
  const token = useAuthStore((state) => state.token);
  const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();
  const {  setVerRegistroSeleccionado } = useVerRegistroStore();

  const [filtrado, setFiltrado] = useState('');
  const [datos, setDatos] = useState([]);

  const getEmpleado = async () => {
    try {
      const response = await axios.get(URL_EMPLEADOS, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data)
      setDatos(response.data);
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al eliminar el departamento.', 'error');
    }
  };
  
// borrado logico
  const handleEliminarEmpleado = async (empleado) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al empleado ${empleado.DNIEmpleado}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.put(
          `${URL_EMPLEADOS_ELIMINAR}${empleado.id_empleado}`,
          { ...empleado }, // Se envía el stock con el campo "eliminado" en true
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Eliminado!', 'El empleado ha sido eliminado correctamente.', 'success');
        getEmpleado(); 
      } catch (error) {
        console.error('Error al eliminar al empleado:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar al empleado.', 'error');
      }
    }
  };
  const columns = [
    { header: 'Nº', accessorKey: 'id_Empleado' },
    { header: 'Nombre y Apellido', accessorFn: row => `${row.nombreEmpleado} ${row.apellidoEmpleado}` },
    { header: 'DNI', accessorKey: 'DNIEmpleado' },
    { header: 'Telefono', accessorKey: 'telefono' },
    { header: 'Direccion', accessorKey: 'direccion' },

    {
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2">
            <button
            onClick={() => setVerRegistroSeleccionado(row.original)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-800 active:bg-blue-900 focus:outline-none"
          >
            Ver más
          </button>
          <button
            onClick={() => setRegistroSeleccionado(row.original)}
            className="bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"
          >
            Editar
          </button>
          <button
            onClick={() => handleEliminarEmpleado(row.original)}
            className="bg-red-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-red-800 active:bg-red-900 focus:outline-none"
          >
            Eliminar
          </button>
        </div>
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
    getEmpleado();
  }, []);

  return (
<div>
      <p className="text-black font-semibold text-4xl display flex justify-center m-5">Registros de Empleados</p>
      <div className="input-search">
        <input
          className="text-black"
          type="search"
          placeholder="Buscador"
          value={filtrado}
          onChange={(e) => setFiltrado(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <button
          onClick={openRegistroModal}
          className="bg-green-600 text-white px-4 py-2 m-2 rounded-full transition duration-200 ease-in-out hover:bg-green-800 active:bg-green-900 focus:outline-none position relative left-64"
        >
          Registrar Empleado
        </button>
      </div>
      <div className='display flex'>
        <div className='position relative top-8'>
      <Aside/>
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
      </div>
      <div className="btn-pages">
        <button className="position relative top-1 m-2 p-2 bg-zinc-900 text-white h-12 rounded-[8px] font-semibold text-[16px]" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Página Anterior
        </button>
        <button className=" position relative top-1 m-2 p-2 bg-zinc-900 text-white h-12 rounded-[8px] font-semibold text-[16px]" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Página Siguiente
        </button>
      </div>
      <EditarEmpleado onEmpleadoEditado={getEmpleado} />
      <CrearEmpleado onEmpleadoRegistrado={getEmpleado} />
      <VerEmpleados onEmpleadoVer={getEmpleado} />
      </div>
  )
}

export default MainEmpleados
