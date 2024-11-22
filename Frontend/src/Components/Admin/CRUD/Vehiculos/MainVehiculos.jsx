import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import EditVehiculoModal from './EditVehiculo';
import CrearVehiculo from './CrearVehiculo';
import '../../../../Styles/table.css';
import { URL_VEHICULOS, URL_VEHICULOS_ELIMINAR } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import useVehiculoStore from '../../../../Context/useVehiculoStore';
import axios from 'axios';
import Swal from 'sweetalert2';

const MainVehiculos = () => {
  const token = useAuthStore((state) => state.token);
  const { setVehiculoSeleccionado, openRegistroModal } = useVehiculoStore();

  const [filtrado, setFiltrado] = useState('');
  const [datos, setDatos] = useState([]);

  const getVehiculos = async () => {
    try {
      const response = await axios.get(URL_VEHICULOS, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data)
      setDatos(response.data);
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
    }
  };

  const handleEliminarVehiculo = async (vehiculo) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el vehículo con patente "${vehiculo.patenteVehiculo}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.put(
          `${URL_VEHICULOS_ELIMINAR}${vehiculo.id_vehiculo}`,
          { ...vehiculo },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Eliminado!', 'El vehículo ha sido eliminado correctamente.', 'success');
        getVehiculos(); 
      } catch (error) {
        console.error('Error al eliminar vehículo:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el vehículo.', 'error');
      }
    }
  };

  const columns = [
    { header: 'Nº Vehiculo', accessorKey: 'id_vehiculo' },
    { header: 'Patente', accessorKey: 'patenteVehiculo' },
    { header: 'Marca', accessorKey: 'marcaVehiculo' },
    { header: 'Tipo de Vehiculo', accessorKey: 'tipoVehiculo' },
    { header: 'Seguro', accessorKey: 'seguroVehiculo' },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => setVehiculoSeleccionado(row.original)}
            className="bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"
          >
            Editar
          </button>
          <button
            onClick={() => handleEliminarVehiculo(row.original)}
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
    getVehiculos();
  }, []);

  return (
    <div>
      <h3 className="text-white text-opacity-50">Visualizando los Vehículos</h3>
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
          className="bg-green-600 text-white px-4 py-2 m-2 rounded-full transition duration-200 ease-in-out hover:bg-green-800 active:bg-green-900 focus:outline-none"
        >
          Registrar Vehículo
        </button>
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
      <div className="btn-pages">
        <button className="m-2 p-2 bg-zinc-900 text-white h-12 rounded-[8px] font-semibold text-[16px]" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Página Anterior
        </button>
        <button className="m-2 p-2 bg-zinc-900 text-white h-12 rounded-[8px] font-semibold text-[16px]" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Página Siguiente
        </button>
      </div>
      <EditVehiculoModal onVehiculoEditado={getVehiculos} />
      <CrearVehiculo onVehiculoRegistrado={getVehiculos} />
    </div>
  );
};

export default MainVehiculos;
