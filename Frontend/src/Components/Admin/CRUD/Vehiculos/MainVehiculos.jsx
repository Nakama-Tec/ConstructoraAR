import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../../Styles/table.css';
import { URL_VEHICULOS, URL_VEHICULOS_EDITAR } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';

const MainVehiculos = () => {
  const token = useAuthStore((state) => state.token);

  const [filtrado, setFiltrado] = useState('');
  const [datos, setDatos] = useState([]);

  const getVehiculos = async () => {
    try {
      const response = await axios.get(URL_VEHICULOS, { headers: { Authorization: `Bearer ${token}` } });
      setDatos(response.data);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  const handleEditar = (vehiculo) => {
    Swal.fire({
      title: 'Editar Vehículo',
      html: `
        <input id="patenteVehiculo" class="swal2-input" value="${vehiculo.patenteVehiculo}" />

        <input id="marcaVehiculo" class="swal2-input" value="${vehiculo.marcaVehiculo}" />
        
        <input id="tipoVehiculo" class="swal2-input" value="${vehiculo.tipoVehiculo}" />

        <input id="seguroVehiculo" class="swal2-input" value="${vehiculo.seguroVehiculo}" />
      `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      preConfirm: () => {
        const patenteVehiculo = document.getElementById('patenteVehiculo').value;
        const marcaVehiculo = document.getElementById('marcaVehiculo').value;
        const tipoVehiculo = document.getElementById('tipoVehiculo').value;
        const seguroVehiculo = document.getElementById('seguroVehiculo').value;

        if (!patenteVehiculo || !marcaVehiculo || !tipoVehiculo || !seguroVehiculo) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        }

        return {
          patenteVehiculo,
          marcaVehiculo,
          tipoVehiculo,
          seguroVehiculo
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`${URL_VEHICULOS_EDITAR}${vehiculo.id_vehiculo}`, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'El vehículo fue actualizado correctamente.', 'success');
          getVehiculos();
        } catch (error) {
          console.error('Error al actualizar vehículo:', error);
          Swal.fire('Error', 'Hubo un problema al actualizar el vehículo.', 'error');
        }
      }
    });
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
        <button onClick={() => handleEditar(row.original)} className="bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none">
          Editar Vehículo
        </button>
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
    </div>
  );
};

export default MainVehiculos;
