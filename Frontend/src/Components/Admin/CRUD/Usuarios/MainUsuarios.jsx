import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import axios from 'axios';
import Swal from 'sweetalert2';
import Aside from '../../../Layout/Aside';
import useRegistroStore from '../../../../Context/useRegistroStore';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';
import '../../../../Styles/table.css';
import { URL_USUARIOS, URL_USUARIOS_ELIMINAR } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import EditarUsuario from './EditarUsuarios';
import CrearUsuario from './CrearUsuarios';
import VerUsuario from './VerUsuarios';

const MainUsuarios = () => {
    const token = useAuthStore((state) => state.token); 
    
    
    const [filtrado, setFiltrado] = useState('');
    const [datos, setDatos] = useState([]);
    const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();
    const {setVerRegistroSeleccionado} = useVerRegistroStore();


  
    const getUsuarios = async () => {
      try {
        const response = await axios.get(URL_USUARIOS, { headers: { Authorization: `Bearer ${token}` } });
        console.log(response.data)
        setDatos(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };


    const handleEliminarUsuario = async (usuario) => {
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar este Usuario ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
  
      if (confirmacion.isConfirmed) {
        try {
          await axios.put(
            `${URL_USUARIOS_ELIMINAR}${usuario.id_usuario}`,
            { ...usuario },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          Swal.fire('Eliminado!', 'El Usuario ha sido eliminado correctamente.', 'success');
          getUsuarios(); 
        } catch (error) {
          console.error('Error al eliminar Usuario:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el Usuario.', 'error');
        }
      }
    };
  
    const columns = [
      { header: 'Nº Usuario', accessorKey: 'id_usuario' },
      { header: 'Empleado', accessorKey: 'nomEmpleado' },
      { header: 'Nombre de Usuario', accessorKey: 'nombreUsuario' },
      { header: 'Mail de Usuario', accessorKey: 'mailUsuario' },
      { header: 'Rol', accessorKey: 'rol' },
      {
        header: 'Acciones',
        cell: ({ row }) => (
          <div className="flex gap-2">
          <button onClick={() => setVerRegistroSeleccionado(row.original)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-800 active:bg-blue-900 focus:outline-none" >
            Ver más
          </button>

          <button
            onClick={() => setRegistroSeleccionado(row.original)}
            className="bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"
          >
            Editar
          </button>
          <button
            onClick={() => handleEliminarUsuario(row.original)}
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
      getUsuarios();
    }, []);
  
    return (
      <div>
      <p className="text-black font-semibold text-4xl display flex relative top-12 justify-center m-5">Registros de Usuarios</p>
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
          Registrar usuarios
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
      <VerUsuario onUsuarioVer={getUsuarios} />
      <EditarUsuario onUsuarioEditado={getUsuarios} />
      <CrearUsuario onUsuarioRegistrado={getUsuarios} />
      </div>
    );
  }
  

export default MainUsuarios
