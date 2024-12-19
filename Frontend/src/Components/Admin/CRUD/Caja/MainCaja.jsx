import React from "react";
import { useTable } from "react-table"; 
import "../../../../Styles/CashFlowTable.css"; // Asegúrate de usar esta hoja de estilos
import { useEffect, useState } from 'react';
import { URL_FLUJO_CAJA } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import axios from 'axios';
import { LIBRO_DIARIO } from '../../../../Routes/routes';
import { Link } from 'react-router-dom';



const MainCaja = () => {

  const token = useAuthStore((state) => state.token);
  // const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  // const [prueba, setPrueba] = useState([]);
  // const [datos, setDatos] = useState([]);
  const [datosMensuales, setDatosMensuales] = useState([]);
  const [año, setAño] = useState(new Date().getFullYear());

  // const [mes, setMes] = useState([]);
  // const [todosLosDatos, setTodosLosDatos] = useState([]); // Nuevo estado para almacenar todas las respuestas

 // Función para obtener la fecha actual en formato "YYYY-MM-DD"
//  const obtenerFechaInicio = () => {
//   const hoy = new Date();
//   const año = hoy.getFullYear();
//   const mes = (hoy.getMonth() + 1).toString().padStart(2, "0");
//   const dia = hoy.getDate().toString().padStart(2, "0");
//   return `${año}-01-01`;
// };

// const obtenerFechaFin = () => {
//   const hoy = new Date();
//   const año = hoy.getFullYear();
//   const mes = (hoy.getMonth() + 1).toString().padStart(2, "0");
//   const dia = hoy.getDate().toString().padStart(2, "0");
//   return `${año}-01-31`;
// };

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
  

// Ejecutar enviarFechaPorPost al cargar el componente
useEffect(() => {
  enviarFechaPorPost();
}, []); 
// funcion para cambiar el color de la celda segun el valor
const getCellClass = (value) => {
  return value < 0 ? "negative-value" : "positive-value";
};

const formatCurrency = (value) => {
  const absValue = Math.abs(value).toLocaleString("es-AR"); // Separador de miles con formato español
  return value < 0 ? `-$${absValue}` : `$${absValue}`;
};



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
      { details: "1. Detalle de Ingresos", style: "DetalleIngreso" },
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
        jan: <span className={getCellClass(TotalIngresos(0))}>{formatCurrency(TotalIngresos(0))}</span>,
        feb: <span className={getCellClass(TotalIngresos(1))}>{formatCurrency(TotalIngresos(1))}</span>,
        mar: <span className={getCellClass(TotalIngresos(2))}>{formatCurrency(TotalIngresos(2))}</span>,
        apr: <span className={getCellClass(TotalIngresos(3))}>{formatCurrency(TotalIngresos(3))}</span>,
        may: <span className={getCellClass(TotalIngresos(4))}>{formatCurrency(TotalIngresos(4))}</span>,
        jun: <span className={getCellClass(TotalIngresos(5))}>{formatCurrency(TotalIngresos(5))}</span>,
        jul: <span className={getCellClass(TotalIngresos(6))}>{formatCurrency(TotalIngresos(6))}</span>,
        aug: <span className={getCellClass(TotalIngresos(7))}>{formatCurrency(TotalIngresos(7))}</span>,
        sep: <span className={getCellClass(TotalIngresos(8))}>{formatCurrency(TotalIngresos(8))}</span>,
        oct: <span className={getCellClass(TotalIngresos(9))}>{formatCurrency(TotalIngresos(9))}</span>,
        nov: <span className={getCellClass(TotalIngresos(10))}>{formatCurrency(TotalIngresos(10))}</span>,
        dec: <span className={getCellClass(TotalIngresos(11))}>{formatCurrency(TotalIngresos(11))}</span>, style: "TotalIngreso" },
      { details: "", style: "white-bold" },
      { details: "", style: "white-bold" },
      { details: "2. Detalle de Egresos", style: "DetalleEgresos" },
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
        jan: <span className={getCellClass(TotalEgresosConsumo(0))}>{formatCurrency(TotalEgresosConsumo(0))}</span>,
        feb: <span className={getCellClass(TotalEgresosConsumo(1))}>{formatCurrency(TotalEgresosConsumo(1))}</span>,
        mar: <span className={getCellClass(TotalEgresosConsumo(2))}>{formatCurrency(TotalEgresosConsumo(2))}</span>,
        apr: <span className={getCellClass(TotalEgresosConsumo(3))}>{formatCurrency(TotalEgresosConsumo(3))}</span>,
        may: <span className={getCellClass(TotalEgresosConsumo(4))}>{formatCurrency(TotalEgresosConsumo(4))}</span>,
        jun: <span className={getCellClass(TotalEgresosConsumo(5))}>{formatCurrency(TotalEgresosConsumo(5))}</span>,
        jul: <span className={getCellClass(TotalEgresosConsumo(6))}>{formatCurrency(TotalEgresosConsumo(6))}</span>,
        aug: <span className={getCellClass(TotalEgresosConsumo(7))}>{formatCurrency(TotalEgresosConsumo(7))}</span>,
        sep: <span className={getCellClass(TotalEgresosConsumo(8))}>{formatCurrency(TotalEgresosConsumo(8))}</span>,
        oct: <span className={getCellClass(TotalEgresosConsumo(9))}>{formatCurrency(TotalEgresosConsumo(9))}</span>,
        nov: <span className={getCellClass(TotalEgresosConsumo(10))}>{formatCurrency(TotalEgresosConsumo(10))}</span>,
        dec: <span className={getCellClass(TotalEgresosConsumo(11))}>{formatCurrency(TotalEgresosConsumo(11))}</span>, style: "EgresoConsumo" },
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
        jan: <span className={getCellClass(TotalEgresosOperativos(0))}>{formatCurrency(TotalEgresosOperativos(0))}</span>,
        feb: <span className={getCellClass(TotalEgresosOperativos(1))}>{formatCurrency(TotalEgresosOperativos(1))}</span>,
        mar: <span className={getCellClass(TotalEgresosOperativos(2))}>{formatCurrency(TotalEgresosOperativos(2))}</span>,
        apr: <span className={getCellClass(TotalEgresosOperativos(3))}>{formatCurrency(TotalEgresosOperativos(3))}</span>,
        may: <span className={getCellClass(TotalEgresosOperativos(4))}>{formatCurrency(TotalEgresosOperativos(4))}</span>,
        jun: <span className={getCellClass(TotalEgresosOperativos(5))}>{formatCurrency(TotalEgresosOperativos(5))}</span>,
        jul: <span className={getCellClass(TotalEgresosOperativos(6))}>{formatCurrency(TotalEgresosOperativos(6))}</span>,
        aug: <span className={getCellClass(TotalEgresosOperativos(7))}>{formatCurrency(TotalEgresosOperativos(7))}</span>,
        sep: <span className={getCellClass(TotalEgresosOperativos(8))}>{formatCurrency(TotalEgresosOperativos(8))}</span>,
        oct: <span className={getCellClass(TotalEgresosOperativos(9))}>{formatCurrency(TotalEgresosOperativos(9))}</span>,
        nov: <span className={getCellClass(TotalEgresosOperativos(10))}>{formatCurrency(TotalEgresosOperativos(10))}</span>,
        dec: <span className={getCellClass(TotalEgresosOperativos(11))}>{formatCurrency(TotalEgresosOperativos(11))}</span>, style: "TotalEgresosOperativos" },
      { details: "", style: "yellow" },
      { details: "", style: "yellow"},
      { details: " .  2.0 Total de Egresos",
        jan: <span className={getCellClass(TotalEgresos(0))}>{formatCurrency(TotalEgresos(0))}</span>,
        feb: <span className={getCellClass(TotalEgresos(1))}>{formatCurrency(TotalEgresos(1))}</span>,
        mar: <span className={getCellClass(TotalEgresos(2))}>{formatCurrency(TotalEgresos(2))}</span>,
        apr: <span className={getCellClass(TotalEgresos(3))}>{formatCurrency(TotalEgresos(3))}</span>,
        may: <span className={getCellClass(TotalEgresos(4))}>{formatCurrency(TotalEgresos(4))}</span>,
        jun: <span className={getCellClass(TotalEgresos(5))}>{formatCurrency(TotalEgresos(5))}</span>,
        jul: <span className={getCellClass(TotalEgresos(6))}>{formatCurrency(TotalEgresos(6))}</span>,
        aug: <span className={getCellClass(TotalEgresos(7))}>{formatCurrency(TotalEgresos(7))}</span>,
        sep: <span className={getCellClass(TotalEgresos(8))}>{formatCurrency(TotalEgresos(8))}</span>,
        oct: <span className={getCellClass(TotalEgresos(9))}>{formatCurrency(TotalEgresos(9))}</span>,
        nov: <span className={getCellClass(TotalEgresos(10))}>{formatCurrency(TotalEgresos(10))}</span>,
        dec: <span className={getCellClass(TotalEgresos(11))}>{formatCurrency(TotalEgresos(11))}</span>, style: "TotalEgreso" },
      { details: "", style: "white-bold" },
      { details: "", style: "white-bold" },
      { details: "3.0 SALDO NETO",
        jan: <span className={getCellClass(SaldoNeto(0))}>{formatCurrency(SaldoNeto(0))}</span>,
        feb: <span className={getCellClass(SaldoNeto(1))}>{formatCurrency(SaldoNeto(1))}</span>,
        mar: <span className={getCellClass(SaldoNeto(2))}>{formatCurrency(SaldoNeto(2))}</span>,
        apr: <span className={getCellClass(SaldoNeto(3))}>{formatCurrency(SaldoNeto(3))}</span>,
        may: <span className={getCellClass(SaldoNeto(4))}>{formatCurrency(SaldoNeto(4))}</span>,
        jun: <span className={getCellClass(SaldoNeto(5))}>{formatCurrency(SaldoNeto(5))}</span>,
        jul: <span className={getCellClass(SaldoNeto(6))}>{formatCurrency(SaldoNeto(6))}</span>,
        aug: <span className={getCellClass(SaldoNeto(7))}>{formatCurrency(SaldoNeto(7))}</span>,
        sep: <span className={getCellClass(SaldoNeto(8))}>{formatCurrency(SaldoNeto(8))}</span>,
        oct: <span className={getCellClass(SaldoNeto(9))}>{formatCurrency(SaldoNeto(9))}</span>,
        nov: <span className={getCellClass(SaldoNeto(10))}>{formatCurrency(SaldoNeto(10))}</span>,
        dec: <span className={getCellClass(SaldoNeto(11))}>{formatCurrency(SaldoNeto(11))}</span>, style: "SaldoNeto" },
      { details: "4.0 SALDO ACUMULADO",
        jan: <span className={getCellClass(SaldoAcumulado(0))}>{formatCurrency(SaldoAcumulado(0))}</span>,
        feb: <span className={getCellClass(SaldoAcumulado(1))}>{formatCurrency(SaldoAcumulado(1))}</span>,
        mar: <span className={getCellClass(SaldoAcumulado(2))}>{formatCurrency(SaldoAcumulado(2))}</span>,
        apr: <span className={getCellClass(SaldoAcumulado(3))}>{formatCurrency(SaldoAcumulado(3))}</span>,
        may: <span className={getCellClass(SaldoAcumulado(4))}>{formatCurrency(SaldoAcumulado(4))}</span>,
        jun: <span className={getCellClass(SaldoAcumulado(5))}>{formatCurrency(SaldoAcumulado(5))}</span>,
        jul: <span className={getCellClass(SaldoAcumulado(6))}>{formatCurrency(SaldoAcumulado(6))}</span>,
        aug: <span className={getCellClass(SaldoAcumulado(7))}>{formatCurrency(SaldoAcumulado(7))}</span>,
        sep: <span className={getCellClass(SaldoAcumulado(8))}>{formatCurrency(SaldoAcumulado(8))}</span>,
        oct: <span className={getCellClass(SaldoAcumulado(9))}>{formatCurrency(SaldoAcumulado(9))}</span>,
        nov: <span className={getCellClass(SaldoAcumulado(10))}>{formatCurrency(SaldoAcumulado(10))}</span>,
        dec: <span className={getCellClass(SaldoAcumulado(11))}>{formatCurrency(SaldoAcumulado(11))}</span>,  style: " SaldoAcumulado" },
    ];
  }, [datosMensuales]);
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
<div>

  <div className="main-caja-container">
    <div className="content">
      <h1 className="text-black font-semibold text-4xl mt-5 mb-6 text-center">FLUJO DE CAJA - AÑO : {año}</h1>

    </div>
  </div>
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
    <thead className="cash-flow-table-header">
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
