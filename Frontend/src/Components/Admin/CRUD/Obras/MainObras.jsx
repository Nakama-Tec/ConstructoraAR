import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import '../../../../Styles/table.css';
import { URL_OBRAS_ELIMINAR, URL_OBRAS } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import useVerRegistroStore from "../../../../Context/useVerRegistroStore";
import Aside from '../../../Layout/Aside';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditarObra from './EditarObra';
import CrearObra from './CrearObra';
import VerObra from './VerObra';

const MainObras = () => {
    const token = useAuthStore((state) => state.token);
    const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();//objeto que se importa de useStockStore
    const { setVerRegistroSeleccionado } = useVerRegistroStore();
    const [filtrado, setFiltrado] = useState('');
    const [datos, setDatos] = useState([]);
  
    const getObra = async () => {
      try {
        const response = await axios.get(URL_OBRAS, { headers: { Authorization: `Bearer ${token}` } });
        console.log(response.data);
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener la obra:', error);
      }
    };
    
  // borrado logico
    const handleEliminarObra = async (obra) => {
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar la obra ${obra.nombreObra}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
  
      if (confirmacion.isConfirmed) {
        try {
          await axios.put(
            `${URL_OBRAS_ELIMINAR}${obra.id_obra}`,
            { ...obra }, // Se envía el stock con el campo "eliminado" en true
            { headers: { Authorization: `Bearer ${token}` } }
          );
          Swal.fire('Eliminado!', 'La obra ha sido eliminado correctamente.', 'success');
          getObra(); 
        } catch (error) {
          console.error('Error al eliminar la obra:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar la obra.', 'error');
        }
      }
    };
  
    const columns = [
      { header: 'Nº', accessorKey: 'id_obra' },
      { header: 'Nombre de la Obra', accessorKey: 'nombreObra' },
      { header: 'Dirección Obra', accessorKey: 'direccionObra' },
      { header: 'Descripcion Obra', accessorKey: 'descripcionObra' },
      { header: 'Fecha Inicio', accessorKey: 'fechainicioObra' },
      { header: 'Fecha Fin', accessorKey: 'fechafinObra' },
      { header: 'Precio Obra', accessorFn: (row) => `$${row.precioObra}` },
      { header: 'Sector', accessorFn: (row) => row.sectorObra === 0 ? "Público" : "Privado" },
      { header: 'Progreso', accessorFn: (row) => `${row.progresoObra}%` },
      { header: 'Cliente', accessorKey: 'id_cliente' },
      {
        header: 'Acciones',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button onClick={() => setVerRegistroSeleccionado(row.original)}
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
              onClick={() => handleEliminarObra(row.original)}
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
      getObra();
    }, []);
  
    return (
      <div>
        <p className="text-black font-semibold text-4xl display flex justify-center relative top-12 m-5">Registros de las Obras</p>
        <div className="input-search relative top-20">
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
            className="bg-green-600 text-white px-4 py-2 m-2 rounded-full transition duration-200 ease-in-out hover:bg-green-800 active:bg-green-900 focus:outline-none position relative left-72"
          >
            Registrar obra
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
        <div className="pagination flex justify-center mt-4">
        {Array.from({ length: table.getPageCount() }, (_, index) => ( // Crea un array con la cantidad de páginas y por cada una crea un botón con el número de la página 
          <button
            key={index} 
            className={`m-2 px-4 py-2 rounded-full font-semibold text-[16px] ${
              table.getState().pagination.pageIndex === index 
                ? "bg-blue-600 text-white" // Estilo para la página seleccionada
                : "bg-gray-300 text-black" // Estilo para las páginas no seleccionadas
            }`}
            onClick={() => table.setPageIndex(index)} // Cambia a la página seleccionada
          >
            {index + 1} 
          </button>
        ))}
      </div>
      <EditarObra onObraEditado={getObra} />
      <CrearObra onObraRegistrado={getObra} />
      <VerObra onObraVer={getObra} />
        </div>
  )
}

export default MainObras
