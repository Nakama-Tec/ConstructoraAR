import React from "react";
import { useTable } from "react-table"; // npm install react-table
import "../../../../Styles/CashFlowTable.css"; // Asegúrate de usar esta hoja de estilos
import { useEffect, useState } from 'react';
import { URL_FLUJO_CAJA } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import axios from 'axios';
import { LIBRO_DIARIO } from '../../../../Routes/routes';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';



const MainCaja = () => {

  const token = useAuthStore((state) => state.token);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [prueba, setPrueba] = useState([]);
  const [datos, setDatos] = useState([]);
  const [datosMensuales, setDatosMensuales] = useState([]);
  const [año, setAño] = useState(new Date().getFullYear());

  const [mes, setMes] = useState([]);
  const [todosLosDatos, setTodosLosDatos] = useState([]); // Nuevo estado para almacenar todas las respuestas

 // Función para obtener la fecha actual en formato "YYYY-MM-DD"
 const obtenerFechaInicio = () => {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = (hoy.getMonth() + 1).toString().padStart(2, "0");
  const dia = hoy.getDate().toString().padStart(2, "0");
  return `${año}-01-01`;
};

const obtenerFechaFin = () => {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = (hoy.getMonth() + 1).toString().padStart(2, "0");
  const dia = hoy.getDate().toString().padStart(2, "0");
  return `${año}-01-31`;
};


// Estado para las fechas inicializado con la fecha actual
// const [fechaInicio, setFechaInicio] = useState(obtenerFechaInicio);
// const [fechaFin, setFechaFin] = useState(obtenerFechaFin);

// console.log("fechaInicio = ", fechaInicio);
// console.log("fechaFin = ", fechaFin);
  // Enviar la fecha por POST
  const enviarFechaPorPost = async () => {
    try {
      const hoy = new Date();
      // const año = hoy.getFullYear();
  
      // Crear un array para almacenar los datos de cada mes
      let datosAcumulados = [];
  
      for (let i = 1; i <= 12; i++) {
        const fechaInicio = `${año}-${i.toString().padStart(2, '0')}-01`;
        const fechaFin = `${año}-${i.toString().padStart(2, '0')}-31`;
  
        const response = await axios.post(
          `${URL_FLUJO_CAJA}/post`,
          { fechaInicio, fechaFin },
          { headers: { authorization: `Bearer ${token}` } }
        );
  
        if (response.status === 200) {
          // Almacenar los datos por mes en el array
          datosAcumulados.push(response.data);
        }
      }
  
      // Actualizar el estado con los datos de todos los meses
      setDatosMensuales(datosAcumulados);
  
    } catch (error) {
      console.error('Error al enviar la fecha por POST:', error);
    }
  };
  

  console.log("datosMensuales = ", datosMensuales);

// Ejecutar enviarFechaPorPost al cargar el componente
useEffect(() => {
  enviarFechaPorPost();
}, [//fechaInicio, //fechaFin
]); // Se ejecuta cuando cambian estas dependencias

  const columns = React.useMemo(
    () => [
      { Header: "Detalle", accessor: "details" },
      { Header: "Ene", accessor: "jan" },
      { Header: "Feb", accessor: "feb" },
      { Header: "Mar", accessor: "mar" },
      { Header: "Abr", accessor: "apr" },
      { Header: "May", accessor: "may" },
      { Header: "Jun", accessor: "jun" },
      { Header: "Jul", accessor: "jul" },
      { Header: "Ago", accessor: "aug" },
      { Header: "Sep", accessor: "sep" },
      { Header: "Oct", accessor: "oct" },
      { Header: "Nov", accessor: "nov" },
      { Header: "Dic", accessor: "dec" },
    ],
    []
  );

  const TotalIngresos = (mesIndex) => {
    let total = 0;
  
    for (let i = 0; i < 6; i++) {
      total += parseFloat(datosMensuales[mesIndex]?.[i]?.Monto ?? 0); // Suma los valores del mes correspondiente
    }
  
    return total;
  };
  
  const TotalEgresosConsumo = (mesIndex) => {
    let total = 0;
  
    for (let i = 6; i < 9; i++) {
      total += parseFloat(datosMensuales[mesIndex]?.[i]?.Monto ?? 0);
    }
  
    return total;
  };
  
  const TotalEgresosOperativos = (mesIndex) => {
    let total = 0;
  
    for (let i = 9; i < 21; i++) {
      total += parseFloat(datosMensuales[mesIndex]?.[i]?.Monto ?? 0);
    }
  
    return total;
  };
  
  const TotalEgresos = (mesIndex) => {
    return TotalEgresosConsumo(mesIndex) + TotalEgresosOperativos(mesIndex);
  };
  
  const SaldoNeto = (mesIndex) => {
    return TotalIngresos(mesIndex) - TotalEgresos(mesIndex);
  };
  

const SaldoAcumulado = (mesIndex) => {
 
  //si es el mes 1 el saldo acumulado es el saldo neto del mes 1 
  if (mesIndex !== 0){
    return SaldoAcumulado(mesIndex - 1) + SaldoNeto(mesIndex); //si no es el mes 1 el saldo acumulado es el saldo acumulado del mes anterior mas el saldo neto del mes actual
  }else
  {
   return SaldoNeto(mesIndex);
  }
     
};


  const data = React.useMemo(
    () => {
      if (!datosMensuales.length) return [];
    return [
      { details: "1. Detalle de Ingresos", style: "green-bold" },
      { details: ' . 1.1 Ingresos por Ventas de Terrenos',...datosMensuales.reduce((acc, mes, index) => {
          const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
          acc[mesAbrev] = "$" + (mes[0]?.Monto ?? 0);  
          return acc;}, {}), style: "green" },
      { details: ' .  1.2  Ingresos por Alquiler duplex',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[1]?.Monto ?? 0);  
        return acc;}, {}), style: "green" },
      { details: ' .  1.3  Ingresos por Obras Privadas',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[2]?.Monto ?? 0);  
        return acc;}, {}), style: "green" },
      { details: ' .  1.4  Ingresos por Obras Publicas',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[3]?.Monto ?? 0);  
        return acc;}, {}), style: "green" },
      { details: ' .  1.5  Cobro de Deudas',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[4]?.Monto ?? 0);  
        return acc;}, {}), style: "green" },
      { details: ' .  1.6  Otros Ingresos',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[5]?.Monto ?? 0);  
        return acc;}, {}), style: "green" },
      { details: " .  1.0 Total de Ingresos",
        jan: `$${TotalIngresos(0)}`,
        feb: `$${TotalIngresos(1)}`,
        mar: `$${TotalIngresos(2)}`,
        apr: `$${TotalIngresos(3)}`,
        may: `$${TotalIngresos(4)}`,
        jun: `$${TotalIngresos(5)}`,
        jul: `$${TotalIngresos(6)}`,
        aug: `$${TotalIngresos(7)}`,
        sep: `$${TotalIngresos(8)}`,
        oct: `$${TotalIngresos(9)}`,
        nov: `$${TotalIngresos(10)}`,
        dec: `$${TotalIngresos(11)}`, style: "green-bold" },
      { details: "", style: "white-bold" },
      { details: "", style: "white-bold" },
      { details: "2. Detalle de Egresos", style: "yellow-bold" },
      { details: " .  2.1 Luz",...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[6]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: " .  2.2 Agua",...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[7]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: " .  2.3 Teléfono",...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[8]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: " -      Egresos en Consumo",
        jan: `$${TotalEgresosConsumo(0)}`,
        feb: `$${TotalEgresosConsumo(1)}`,
        mar: `$${TotalEgresosConsumo(2)}`,
        apr: `$${TotalEgresosConsumo(3)}`,
        may: `$${TotalEgresosConsumo(4)}`,
        jun: `$${TotalEgresosConsumo(5)}`,
        jul: `$${TotalEgresosConsumo(6)}`,
        aug: `$${TotalEgresosConsumo(7)}`,
        sep: `$${TotalEgresosConsumo(8)}`,
        oct: `$${TotalEgresosConsumo(9)}`,
        nov: `$${TotalEgresosConsumo(10)}`,
        dec: `$${TotalEgresosConsumo(11)}`, style: "yellow-bold" },
      { details: "", style: "yellow" },
      { details: "", style: "yellow" },
      { details: ' .  2.4  Compra de Elementos de Oficina',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[9]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: ' .  2.5  Compra de Materiales de Obra',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[10]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: ' .  2.6  Salarios Administrativos',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[11]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: ' .  2.7  Salarios de Obras Privadas',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[12]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: ' .  2.8  Salarios de Obras Públicas',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[13]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: ' .  2.9  Pagos a Tercerizados O.Privadas',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[14]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: ' .  2.10 Pagos a Tercerizados O.Públicas',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[15]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: ' .  2.11 Administración y Ventas',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[16]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: ' .  2.12 Impuestos',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[17]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details:' .  2.13 Amortizaciones',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[18]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details:' .  2.14 Intereses',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[19]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details:' .  2.15 Otros Egresos',...datosMensuales.reduce((acc, mes, index) => {
        const mesAbrev = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][index];
        acc[mesAbrev] = "$" + (mes[20]?.Monto ?? 0);  
        return acc;}, {}), style: "yellow" },
      { details: ' -      Egresos Operativos',
        jan: `$${TotalEgresosOperativos(0)}`,
        feb: `$${TotalEgresosOperativos(1)}`,
        mar: `$${TotalEgresosOperativos(2)}`,
        apr: `$${TotalEgresosOperativos(3)}`,
        may: `$${TotalEgresosOperativos(4)}`,
        jun: `$${TotalEgresosOperativos(5)}`,
        jul: `$${TotalEgresosOperativos(6)}`,
        aug: `$${TotalEgresosOperativos(7)}`,
        sep: `$${TotalEgresosOperativos(8)}`,
        oct: `$${TotalEgresosOperativos(9)}`,
        nov: `$${TotalEgresosOperativos(10)}`,
        dec: `$${TotalEgresosOperativos(11)}`, style: "yellow-bold " },
      { details: "", style: "yellow" },
      { details: "", style: "yellow"},
      { details: " .  2.0 Total de Egresos",
        jan: `$${TotalEgresos(0)}`,
        feb: `$${TotalEgresos(1)}`,
        mar: `$${TotalEgresos(2)}`,
        apr: `$${TotalEgresos(3)}`,
        may: `$${TotalEgresos(4)}`,
        jun: `$${TotalEgresos(5)}`,
        jul: `$${TotalEgresos(6)}`,
        aug: `$${TotalEgresos(7)}`,
        sep: `$${TotalEgresos(8)}`,
        oct: `$${TotalEgresos(9)}`,
        nov: `$${TotalEgresos(10)}`,
        dec: `$${TotalEgresos(11)}`, style: "yellow-bold" },
      { details: "", style: "white-bold" },
      { details: "", style: "white-bold" },
      { details: "3.0 SALDO NETO",
        jan: `$${SaldoNeto(0)}`,
        feb: `$${SaldoNeto(1)}`,
        mar: `$${SaldoNeto(2)}`,
        apr: `$${SaldoNeto(3)}`,
        may: `$${SaldoNeto(4)}`,
        jun: `$${SaldoNeto(5)}`,
        jul: `$${SaldoNeto(6)}`,
        aug: `$${SaldoNeto(7)}`,
        sep: `$${SaldoNeto(8)}`,
        oct: `$${SaldoNeto(9)}`,
        nov: `$${SaldoNeto(10)}`,
        dec: `$${SaldoNeto(11)}`, style: "aqua-bold" },
      { details: "4.0 SALDO ACUMULADO",
        jan: `$${SaldoAcumulado(0)}`,
        feb: `$${SaldoAcumulado(1)}`,
        mar: `$${SaldoAcumulado(2)}`,
        apr: `$${SaldoAcumulado(3)}`,
        may: `$${SaldoAcumulado(4)}`,
        jun: `$${SaldoAcumulado(5)}`,
        jul: `$${SaldoAcumulado(6)}`,
        aug: `$${SaldoAcumulado(7)}`,
        sep: `$${SaldoAcumulado(8)}`,
        oct: `$${SaldoAcumulado(9)}`,
        nov: `$${SaldoAcumulado(10)}`,
        dec: `$${SaldoAcumulado(11)}`,  style: " aqua-bold" },
    ];
  }, [datosMensuales]);
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  // rows.forEach((row, index) => {
  //   console.log(`Fila ${index + 1}:`, row.original);
    
  // });



 // Obtener la fecha actual en formato YYYY-MM-DD
//  useEffect(() => {
//   enviarFechaPorPost()
//   const fechaInicio = obtenerFechaInicio();
//   const fechaFin = obtenerFechaFin();
//     setFechaInicio(fechaInicio);
//     setFechaFin(fechaFin); // Puedes ajustar esto según tus necesidades
  
  
// }, []); 

  return (
<div>

  <div className="main-caja-container">
    <div className="content">
      <h1 className="text-black font-semibold text-4xl mt-5 mb-6 text-center">FLUJO DE CAJA - AÑO : {año}</h1>
      {/* <p className="text-xl text-gray-700 font-bold mb-3 text-center">Selecciona la fecha</p> */}

      {/* <div className="date-selector flex flex-col md:flex-row items-center gap-4 justify-center">
        <div className="flex flex-col">
          <label htmlFor="fechaInicio" className="text-sm font-medium mb-1">Fecha Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
           value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div> */}

        {/* <div className="flex flex-col">
          <label htmlFor="fechaFin" className="text-sm font-medium mb-1">Fecha Fin:</label>
          <input
            type="date"
            id="fechaFin"
           value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div> */}

      {/* <div className="flex justify-center mt-6">
        <button
          onClick={enviarFechaPorPost}
          className="px-6 py-2 bg-blue-600 text-white font-medium text-sm rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none "
        >
          Enviar Fechas
        </button>
      </div> */}
    </div>
  </div>
  {/* <div className="btn librodirario flex justify-end back">
< Link to={LIBRO_DIARIO} className="px-6 py-2 bg-green-600 text-white font-medium text-4xl rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none mr-16">
LIBRO DIARIO</Link>
</div> */}
  <br />
  {/* TABLA FLUJO DE CAJA */}
  <p className="text-xl text-gray-700 font-bold mb-3 text-center">Selecciona Historial de Caja</p>
  <br />
  <p htmlFor="año" className="text-xl font-medium mb-1 text-center">Año:</p>
  <select 
  name="Historial de flujo Caja" 
  id="historial"
  className="block mx-auto mb-6 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
  onChange={(e) => setAño(e.target.value)}
>
  <option value="2024">2024</option>
  <option value="2023">2023</option>
  <option value="2022">2022</option>
</select>
  <div className="flex justify-center mt-6">
        <button
          onClick={enviarFechaPorPost}
          className="px-4 py-2 bg-blue-600 text-white font-medium text-base rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none "
        >
          Enviar Historial de Caja
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

  <br/>

  <table {...getTableProps()} className="cash-flow-table">
    <thead>
      {headerGroups.map((headerGroup, index) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
          {headerGroup.headers.map((column, index) => (
            <th {...column.getHeaderProps()} key={index}>
              {column.render("Header")}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row, index) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} className={row.original.style} key={index}>
            {row.cells.map((cell, index) => (
              <td {...cell.getCellProps()} key={index}>
                {cell.render("Cell")}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
  );
};

export default MainCaja;
