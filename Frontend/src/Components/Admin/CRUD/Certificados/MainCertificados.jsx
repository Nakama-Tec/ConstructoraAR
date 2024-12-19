import { useState, useEffect } from "react";
import {useReactTable,getCoreRowModel,flexRender,getPaginationRowModel,getFilteredRowModel,} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import "../../../../Styles/table.css";
import {URL_CERTIFICADOS, URL_CERTIFICADOS_ELIMINAR} from "../../../../Constants/endpoints-API";
import useAuthStore from "../../../../Context/useAuthStore";
import useRegistroStore from "../../../../Context/useRegistroStore";
import useVerRegistroStore from "../../../../Context/useVerRegistroStore";
import Aside from "../../../Layout/Aside";
import axios from "axios";
import Swal from "sweetalert2";
import EditarCertificados from "./EditarCertificados";
import CrearCertificados from "./CrearCertificados";
import VerCertificados from "./VerCertificados";
import { LIBRO_DIARIO } from "../../../../Routes/routes";

const MainCertificados = () => {
    const token = useAuthStore((state) => state.token);
    const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();
    const { setVerRegistroSeleccionado } = useVerRegistroStore();
  
    const [filtrado, setFiltrado] = useState("");
    const [datos, setDatos] = useState([]);
  
    const getCertificados = async () => {
      try {
        const response = await axios.get(URL_CERTIFICADOS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDatos(response.data);
      } catch (error) {
        console.error("Error al obtener certificados:", error);
      }
    };
  
    // borrado logico
    const handleEliminarCertificados = async (certificado) => {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Deseas eliminar al certificado "${certificado.nroCertificado}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
  
      if (confirmacion.isConfirmed) {
        try {
          await axios.put(
            `${URL_CERTIFICADOS_ELIMINAR}${certificado.id_certificado}`,
            { ...certificado },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          Swal.fire(
            "Eliminado!",
            "El certificado ha sido eliminado correctamente.",
            "success"
          );
          getCertificados();
        } catch (error) {
          Swal.fire("Error", "Hubo un problema al eliminar el certificado.", "error");
        }
      }
    };
  
    const columns = [
      { header: "Nº", accessorKey: "id_certificado" },
      { header: "Monto", accessorFn: (row) => `$${row.montoCert}.00` },
      { header: "Fecha de Emisión", accessorKey: "fechaEmisionCert" },
      { header: "Fecha de Pago", accessorKey: "fechaPagoCert" },
      { header: "Estado", accessorFn: (row) => (row.estadoCert === 0 ? "Pagado" : "No Pagado") },
      { header: "Redeterminación", accessorFn: (row) => (row.redeterminacion === 0 ? "Revalorizado" : "No Revalorizado") },
      { header: "Obra Asociada", accessorKey: "NombreObra" },
      {
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button onClick={() => setVerRegistroSeleccionado(row.original)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-800 active:bg-blue-900 focus:outline-none"
            >
              Ver más
            </button>
            <button onClick={() => setRegistroSeleccionado(row.original)}
              className="bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"
            >
              Editar
            </button>
            <button onClick={() => handleEliminarCertificados(row.original)}
              className="bg-red-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-red-800 active:bg-red-900 focus:outline-none"
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ];
  
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
  
    useEffect(() => {
      getCertificados();
    }, []);
  
    return (
<div>
  <p className="text-black font-semibold text-4xl flex justify-center mt-5">Registros de Certificados</p>
  
  {/* Buscador */}
  <div className="flex justify-center m-10">
    <div className="relative">
      <input
        className="w-80 md:w-96 lg:w-[400px] px-4 py-2 text-gray-800 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="search"
        placeholder="Buscar certificados..."
        value={filtrado}
        onChange={(e) => setFiltrado(e.target.value)}
      />
    </div>
  </div>

  {/* Botón para registrar */}
  <div className="flex justify-center m-6">
    <button
      onClick={openRegistroModal}
      className="bg-green-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-green-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
    >
      Registrar Certificado
    </button>
  </div>
  <div className="flex justify-start items-center bg-gray-100 p-4">
  <Link
    to={LIBRO_DIARIO}
    className="px-6 py-3 bg-green-600 text-white font-semibold text-lg md:text-xl rounded-lg shadow-lg transition transform hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
  >
    Volver a Libro Diario
  </Link>
</div>
<br />
  <div className="flex">
    <div className="relative top-8">
      <Aside />
    </div>

    {/* Contenedor de la tabla con desplazamiento horizontal */}
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="odd:bg-white even:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-4 py-2 border border-gray-300 text-sm text-gray-600"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  <div className="pagination flex justify-center mt-4">
    {Array.from({ length: table.getPageCount() }, (_, index) => (
      <button
        key={index}
        className={`m-2 px-4 py-2 rounded-full font-semibold text-[16px] ${
          table.getState().pagination.pageIndex === index 
            ? "bg-blue-600 text-white"
            : "bg-gray-300 text-black"
        }`}
        onClick={() => table.setPageIndex(index)}
      >
        {index + 1}
      </button>
    ))}
  </div>
  
        <EditarCertificados onCertificadoEditado={getCertificados} />
        <CrearCertificados onCertificadoRegistrado={getCertificados} />
        <VerCertificados onCertificadoVer={getCertificados} />
      </div>
    );
  };

export default MainCertificados
