import React from "react";
import { useTable } from "react-table"; // npm install react-table
import "../../../../Styles/CashFlowTable.css"; // Asegúrate de usar esta hoja de estilos
import { useEffect, useState } from 'react';
import { URL_FLUJO_CAJA } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import axios from 'axios';
import Button from 'react-bootstrap/Button';



const MainCaja = () => {

  const token = useAuthStore((state) => state.token);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [prueba, setPrueba] = useState([]);
  const [datos, setDatos] = useState([]);

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
const [fechaInicio, setFechaInicio] = useState(obtenerFechaInicio);
const [fechaFin, setFechaFin] = useState(obtenerFechaFin);

// console.log("fechaInicio = ", fechaInicio);
// console.log("fechaFin = ", fechaFin);
  // Enviar la fecha por POST
  const enviarFechaPorPost = async () => {
    try {
      const response = await axios.post(
        `${URL_FLUJO_CAJA}/post`,
        { fechaInicio, fechaFin },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log('Fecha enviada con éxito Post:', response.data);

        setDatos(response.data); // Guarda la respuesta en el estado

        
      }
    } catch (error) {
      console.error('Error al enviar la fecha por POST:', error);
    }
  };


// Ejecutar enviarFechaPorPost al cargar el componente
useEffect(() => {
  enviarFechaPorPost();
}, [fechaInicio, fechaFin]); // Se ejecuta cuando cambian estas dependencias

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

  const TotalIngresos = () => {
    let total = 0;
    for (let i = 0; i < 6; i++) {
      total += parseFloat(datos[i]?.Monto ?? 0); // Usa 0 si Monto es null o undefined
    }
    console.log("Total Ingresos = ", total);
    return total;
  };
  

  const TotalEgresosConsumo = () =>{
    let total = 0;
    for (let i = 6; i < 9; i++) {
      total += parseFloat(datos[i]?.Monto ?? 0);
    }

    console.log("Total Egresos Consumo = ", total);
    return total;
  }

  const TotalEgresosOperativos = () =>{
    let total = 0;
    for (let i = 9; i < 21; i++) {
      total += parseFloat(datos[i]?.Monto ?? 0);
    }

    console.log("Total Egresos Operativos = ", total);
    return total;
  }

  const TotalEgresos = () =>{
    let total = 0;
    total = TotalEgresosConsumo() + TotalEgresosOperativos();
    console.log("Total Egresos = ", total);
    return total;
  }

  const SaldoNeto = () =>{
    let total = 0;
    total = TotalIngresos() - TotalEgresos();
    console.log("Saldo Neto = ", total);
    return total;
  }

  const SaldoAcumulado = () =>{
    let total = 0;
    total = SaldoNeto();
    console.log("Saldo Acumulado = ", total);
    return total;
  }


  const data = React.useMemo(
    () => {
      if (!datos.length) return [];
    return [
      { details: "1. Detalle de Ingresos", style: "green-bold" },
      { details: ' .  1.1  Ingresos por Ventas de Terrenos', jan: "$"+(datos[0]?.Monto ?? 0), feb: "$"+(datos[0]?.Monto ?? 0), mar: "$"+(datos[0]?.Monto ?? 0), apr: "$"+(datos[0]?.Monto ?? 0), may: "$"+(datos[0]?.Monto ?? 0), jun: "$"+(datos[0]?.Monto ?? 0), jul: "$"+(datos[0]?.Monto ?? 0), aug: "$"+(datos[0]?.Monto ?? 0), sep: "$"+(datos[0]?.Monto ?? 0), oct: "$"+(datos[0]?.Monto ?? 0), nov: "$"+(datos[0]?.Monto ?? 0), dec: "$"+(datos[0]?.Monto ?? 0), style: "green" },
      { details: ' .  1.2  Ingresos por Alquiler duplex', jan: "$"+(datos[1]?.Monto ?? 0), feb: "$"+(datos[1]?.Monto ?? 0), mar: "$"+(datos[1]?.Monto ?? 0), apr: "$"+(datos[1]?.Monto ?? 0), may: "$"+(datos[1]?.Monto ?? 0), jun: "$"+(datos[1]?.Monto ?? 0), jul: "$"+(datos[1]?.Monto ?? 0), aug: "$"+(datos[1]?.Monto ?? 0), sep: "$"+(datos[1]?.Monto ?? 0), oct: "$"+(datos[1]?.Monto ?? 0), nov: "$"+(datos[1]?.Monto ?? 0), dec: "$"+(datos[1]?.Monto ?? 0), style: "green" },
      { details: ' .  1.3  Ingresos por Obras Privadas', jan: "$"+(datos[2]?.Monto ?? 0), feb: "$"+(datos[2]?.Monto ?? 0), mar: "$"+(datos[2]?.Monto ?? 0), apr: "$"+(datos[2]?.Monto ?? 0), may: "$"+(datos[2]?.Monto ?? 0), jun: "$"+(datos[2]?.Monto ?? 0), jul: "$"+(datos[2]?.Monto ?? 0), aug: "$"+(datos[2]?.Monto ?? 0), sep: "$"+(datos[2]?.Monto ?? 0), oct: "$"+(datos[2]?.Monto ?? 0), nov: "$"+(datos[2]?.Monto ?? 0), dec: "$"+(datos[2]?.Monto ?? 0), style: "green" },
      { details: ' .  1.4  Ingresos por Obras Publicas', jan: "$"+(datos[3]?.Monto ?? 0), feb: "$"+(datos[3]?.Monto ?? 0), mar: "$"+(datos[3]?.Monto ?? 0), apr: "$"+(datos[3]?.Monto ?? 0), may: "$"+(datos[3]?.Monto ?? 0), jun: "$"+(datos[3]?.Monto ?? 0), jul: "$"+(datos[3]?.Monto ?? 0), aug: "$"+(datos[3]?.Monto ?? 0), sep: "$"+(datos[3]?.Monto ?? 0), oct: "$"+(datos[3]?.Monto ?? 0), nov: "$"+(datos[3]?.Monto ?? 0), dec: "$"+(datos[3]?.Monto ?? 0), style: "green" },
      { details: ' .  1.5  Cobro de Deudas', jan: "$"+(datos[4]?.Monto ?? 0), feb: "$"+(datos[4]?.Monto ?? 0), mar: "$"+(datos[4]?.Monto ?? 0), apr: "$"+(datos[4]?.Monto ?? 0), may: "$"+(datos[4]?.Monto ?? 0), jun: "$"+(datos[4]?.Monto ?? 0), jul: "$"+(datos[4]?.Monto ?? 0), aug: "$"+(datos[4]?.Monto ?? 0), sep: "$"+(datos[4]?.Monto ?? 0), oct: "$"+(datos[4]?.Monto ?? 0), nov: "$"+(datos[4]?.Monto ?? 0), dec: "$"+(datos[4]?.Monto ?? 0), style: "green" },
      { details: ' .  1.6  Otros Ingresos', jan: "$"+(datos[5]?.Monto ?? 0), feb: "$"+(datos[5]?.Monto ?? 0), mar: "$"+(datos[5]?.Monto ?? 0), apr: "$"+(datos[5]?.Monto ?? 0), may: "$"+(datos[5]?.Monto ?? 0), jun: "$"+(datos[5]?.Monto ?? 0), jul: "$"+(datos[5]?.Monto ?? 0), aug: "$"+(datos[5]?.Monto ?? 0), sep: "$"+(datos[5]?.Monto ?? 0), oct: "$"+(datos[5]?.Monto ?? 0), nov: "$"+(datos[5]?.Monto ?? 0), dec: "$"+(datos[5]?.Monto ?? 0), style: "green" },
      { details: " .  1.0 Total de Ingresos", jan: "$"+TotalIngresos(), feb: "$"+TotalIngresos(), mar: "$"+TotalIngresos(), apr: "$"+TotalIngresos(), may: "$"+TotalIngresos(), jun: "$"+TotalIngresos(), jul: "$"+TotalIngresos(), aug: "$"+TotalIngresos(), sep: "$"+TotalIngresos(), oct: "$"+TotalIngresos(), nov: "$"+TotalIngresos(), dec: "$"+TotalIngresos(), style: "green-bold" },
      { details: "", style: "white-bold" },
      { details: "", style: "white-bold" },
      { details: "2. Detalle de Egresos", style: "yellow-bold" },
      { details: " .  2.1 Luz", jan: "$"+(datos[6]?.Monto ?? 0), feb: "$"+(datos[6]?.Monto ?? 0), mar: "$"+(datos[6]?.Monto ?? 0), apr: "$"+(datos[6]?.Monto ?? 0), may: "$"+(datos[6]?.Monto ?? 0), jun: "$"+(datos[6]?.Monto ?? 0), jul: "$"+(datos[6]?.Monto ?? 0), aug: "$"+(datos[6]?.Monto ?? 0), sep: "$"+(datos[6]?.Monto ?? 0), oct: "$"+(datos[6]?.Monto ?? 0), nov: "$"+(datos[6]?.Monto ?? 0), dec: "$"+(datos[6]?.Monto ?? 0), style: "yellow" },
      { details: " .  2.2 Agua", jan: "$"+(datos[7]?.Monto ?? 0), feb: "$"+(datos[7]?.Monto ?? 0), mar: "$"+(datos[7]?.Monto ?? 0), apr: "$"+(datos[7]?.Monto ?? 0), may: "$"+(datos[7]?.Monto ?? 0), jun: "$"+(datos[7]?.Monto ?? 0), jul: "$"+(datos[7]?.Monto ?? 0), aug: "$"+(datos[7]?.Monto ?? 0), sep: "$"+(datos[7]?.Monto ?? 0), oct: "$"+(datos[7]?.Monto ?? 0), nov: "$"+(datos[7]?.Monto ?? 0), dec: "$"+(datos[7]?.Monto ?? 0), style: "yellow" },
      { details: " .  2.3 Teléfono", jan: "$"+(datos[8]?.Monto ?? 0), feb: "$"+(datos[8]?.Monto ?? 0), mar: "$"+(datos[8]?.Monto ?? 0), apr: "$"+(datos[8]?.Monto ?? 0), may: "$"+(datos[8]?.Monto ?? 0), jun: "$"+(datos[8]?.Monto ?? 0), jul: "$"+(datos[8]?.Monto ?? 0), aug: "$"+(datos[8]?.Monto ?? 0), sep: "$"+(datos[8]?.Monto ?? 0), oct: "$"+(datos[8]?.Monto ?? 0), nov: "$"+(datos[8]?.Monto ?? 0), dec: "$"+(datos[8]?.Monto ?? 0), style: "yellow" },
      { details: " -      Egresos en Consumo", jan: "$"+TotalEgresosConsumo(), feb: "$"+TotalEgresosConsumo(), mar: "$"+TotalEgresosConsumo(), apr: "$"+TotalEgresosConsumo(), may: "$"+TotalEgresosConsumo(), jun: "$"+TotalEgresosConsumo(), jul: "$"+TotalEgresosConsumo(), aug: "$"+TotalEgresosConsumo(), sep: "$"+TotalEgresosConsumo(), oct: "$"+TotalEgresosConsumo(), nov: "$"+TotalEgresosConsumo(), dec: "$"+TotalEgresosConsumo(), style: "yellow-bold" },
      { details: "", style: "yellow" },
      { details: "", style: "yellow" },
      { details: ' .  2.4  Compra de Elementos de Oficina', jan: "$"+(datos[9]?.Monto ?? 0), feb: "$"+(datos[9]?.Monto ?? 0), mar: "$"+(datos[9]?.Monto ?? 0), apr: "$"+(datos[9]?.Monto ?? 0), may: "$"+(datos[9]?.Monto ?? 0), jun: "$"+(datos[9]?.Monto ?? 0), jul: "$"+(datos[9]?.Monto ?? 0), aug: "$"+(datos[9]?.Monto ?? 0), sep: "$"+(datos[9]?.Monto ?? 0), oct: "$"+(datos[9]?.Monto ?? 0), nov: "$"+(datos[9]?.Monto ?? 0), dec: "$"+(datos[9]?.Monto ?? 0), style: "yellow" },
      { details: ' .  2.5  Compra de Materiales de Obra', jan: "$"+(datos[10]?.Monto ?? 0), feb: "$"+(datos[10]?.Monto ?? 0), mar: "$"+(datos[10]?.Monto ?? 0), apr: "$"+(datos[10]?.Monto ?? 0), may: "$"+(datos[10]?.Monto ?? 0), jun: "$"+(datos[10]?.Monto ?? 0), jul: "$"+(datos[10]?.Monto ?? 0), aug: "$"+(datos[10]?.Monto ?? 0), sep: "$"+(datos[10]?.Monto ?? 0), oct: "$"+(datos[10]?.Monto ?? 0), nov: "$"+(datos[10]?.Monto ?? 0), dec: "$"+(datos[10]?.Monto ?? 0), style: "yellow" },
      { details: ' .  2.6  Salarios Administrativos', jan: "$"+(datos[11]?.Monto ?? 0), feb: "$"+(datos[11]?.Monto ?? 0), mar: "$"+(datos[11]?.Monto ?? 0), apr: "$"+(datos[11]?.Monto ?? 0), may: "$"+(datos[11]?.Monto ?? 0), jun: "$"+(datos[11]?.Monto ?? 0), jul: "$"+(datos[11]?.Monto ?? 0), aug: "$"+(datos[11]?.Monto ?? 0), sep: "$"+(datos[11]?.Monto ?? 0), oct: "$"+(datos[11]?.Monto ?? 0), nov: "$"+(datos[11]?.Monto ?? 0), dec: "$"+(datos[11]?.Monto ?? 0), style: "yellow" },
      { details: ' .  2.7  Salarios de Obras Privadas', jan: "$"+(datos[12]?.Monto ?? 0), feb: "$"+(datos[12]?.Monto ?? 0), mar: "$"+(datos[12]?.Monto ?? 0), apr: "$"+(datos[12]?.Monto ?? 0), may: "$"+(datos[12]?.Monto ?? 0), jun: "$"+(datos[12]?.Monto ?? 0), jul: "$"+(datos[12]?.Monto ?? 0), aug: "$"+(datos[12]?.Monto ?? 0), sep: "$"+(datos[12]?.Monto ?? 0), oct: "$"+(datos[12]?.Monto ?? 0), nov: "$"+(datos[12]?.Monto ?? 0), dec: "$"+(datos[12]?.Monto ?? 0), style: "yellow" },
      { details: ' .  2.8  Salarios de Obras Públicas', jan: "$"+(datos[13]?.Monto ?? 0), feb: "$"+(datos[13]?.Monto ?? 0), mar: "$"+(datos[13]?.Monto ?? 0), apr: "$"+(datos[13]?.Monto ?? 0), may: "$"+(datos[13]?.Monto ?? 0), jun: "$"+(datos[13]?.Monto ?? 0), jul: "$"+(datos[13]?.Monto ?? 0), aug: "$"+(datos[13]?.Monto ?? 0), sep: "$"+(datos[13]?.Monto ?? 0), oct: "$"+(datos[13]?.Monto ?? 0), nov: "$"+(datos[13]?.Monto ?? 0), dec: "$"+(datos[13]?.Monto ?? 0), style: "yellow" },
      { details: ' .  2.9  Pagos a Tercerizados O.Privadas', jan: "$"+(datos[14]?.Monto ?? 0), feb: "$"+(datos[14]?.Monto ?? 0), mar: "$"+(datos[14]?.Monto ?? 0), apr: "$"+(datos[14]?.Monto ?? 0), may: "$"+(datos[14]?.Monto ?? 0), jun: "$"+(datos[14]?.Monto ?? 0), jul: "$"+(datos[14]?.Monto ?? 0), aug: "$"+(datos[14]?.Monto ?? 0), sep: "$"+(datos[14]?.Monto ?? 0), oct: "$"+(datos[14]?.Monto ?? 0), nov: "$"+(datos[14]?.Monto ?? 0), dec: "$"+(datos[14]?.Monto ?? 0), style: "yellow" },
      { details: ' .  2.10 Pagos a Tercerizados O.Públicas', jan: "$"+(datos[15]?.Monto ?? 0), feb: "$"+(datos[15]?.Monto ?? 0), mar: "$"+(datos[15]?.Monto ?? 0), apr: "$"+(datos[15]?.Monto ?? 0), may: "$"+(datos[15]?.Monto ?? 0), jun: "$"+(datos[15]?.Monto ?? 0), jul: "$"+(datos[15]?.Monto ?? 0), aug: "$"+(datos[15]?.Monto ?? 0), sep: "$"+(datos[15]?.Monto ?? 0), oct: "$"+(datos[15]?.Monto ?? 0), nov: "$"+(datos[15]?.Monto ?? 0), dec: "$"+(datos[15]?.Monto ?? 0), style: "yellow" },
      { details: ' .  2.11 Administración y Ventas', jan: "$"+(datos[16]?.Monto ?? 0), feb: "$"+(datos[16]?.Monto ?? 0), mar: "$"+(datos[16]?.Monto ?? 0), apr: "$"+(datos[16]?.Monto ?? 0), may: "$"+(datos[16]?.Monto ?? 0), jun: "$"+(datos[16]?.Monto ?? 0), jul: "$"+(datos[16]?.Monto ?? 0), aug: "$"+(datos[16]?.Monto ?? 0), sep: "$"+(datos[16]?.Monto ?? 0), oct: "$"+(datos[16]?.Monto ?? 0), nov: "$"+(datos[16]?.Monto ?? 0), dec: "$"+(datos[16]?.Monto ?? 0), style: "yellow" },
      { details: ' .  2.12 Impuestos', jan: "$"+(datos[17]?.Monto ?? 0), feb: "$"+(datos[17]?.Monto ?? 0), mar: "$"+(datos[17]?.Monto ?? 0), apr: "$"+(datos[17]?.Monto ?? 0), may: "$"+(datos[17]?.Monto ?? 0), jun: "$"+(datos[17]?.Monto ?? 0), jul: "$"+(datos[17]?.Monto ?? 0), aug: "$"+(datos[17]?.Monto ?? 0), sep: "$"+(datos[17]?.Monto ?? 0), oct: "$"+(datos[17]?.Monto ?? 0), nov: "$"+(datos[17]?.Monto ?? 0), dec: "$"+(datos[17]?.Monto ?? 0), style: "yellow" },
      { details:' .  2.13 Amortizaciones', jan: "$"+(datos[18]?.Monto ?? 0), feb: "$"+(datos[18]?.Monto ?? 0), mar: "$"+(datos[18]?.Monto ?? 0), apr: "$"+(datos[18]?.Monto ?? 0), may: "$"+(datos[18]?.Monto ?? 0), jun: "$"+(datos[18]?.Monto ?? 0), jul: "$"+(datos[18]?.Monto ?? 0), aug: "$"+(datos[18]?.Monto ?? 0), sep: "$"+(datos[18]?.Monto ?? 0), oct: "$"+(datos[18]?.Monto ?? 0), nov: "$"+(datos[18]?.Monto ?? 0), dec: "$"+(datos[18]?.Monto ?? 0), style: "yellow" },
      { details:' .  2.14 Intereses', jan: "$"+(datos[19]?.Monto ?? 0), feb: "$"+(datos[19]?.Monto ?? 0), mar: "$"+(datos[19]?.Monto ?? 0), apr: "$"+(datos[19]?.Monto ?? 0), may: "$"+(datos[19]?.Monto ?? 0), jun: "$"+(datos[19]?.Monto ?? 0), jul: "$"+(datos[19]?.Monto ?? 0), aug: "$"+(datos[19]?.Monto ?? 0), sep: "$"+(datos[19]?.Monto ?? 0), oct: "$"+(datos[19]?.Monto ?? 0), nov: "$"+(datos[19]?.Monto ?? 0), dec: "$"+(datos[19]?.Monto ?? 0), style: "yellow" },
      { details:' .  2.15 Otros Egresos', jan: "$"+(datos[20]?.Monto ?? 0), feb: "$"+(datos[20]?.Monto ?? 0), mar: "$"+(datos[20]?.Monto ?? 0), apr: "$"+(datos[20]?.Monto ?? 0), may: "$"+(datos[20]?.Monto ?? 0), jun: "$"+(datos[20]?.Monto ?? 0), jul: "$"+(datos[20]?.Monto ?? 0), aug: "$"+(datos[20]?.Monto ?? 0), sep: "$"+(datos[20]?.Monto ?? 0), oct: "$"+(datos[20]?.Monto ?? 0), nov: "$"+(datos[20]?.Monto ?? 0), dec: "$"+(datos[20]?.Monto ?? 0), style: "yellow" },
      { details: ' -      Egresos Operativos', jan: "$"+TotalEgresosOperativos(), feb: "$"+TotalEgresosOperativos(), mar: "$"+TotalEgresosOperativos(), apr: "$"+TotalEgresosOperativos(), may: "$"+TotalEgresosOperativos(), jun: "$"+TotalEgresosOperativos(), jul: "$"+TotalEgresosOperativos(), aug: "$"+TotalEgresosOperativos(), sep: "$"+TotalEgresosOperativos(), oct: "$"+TotalEgresosOperativos(), nov: "$"+TotalEgresosOperativos(), dec: "$"+TotalEgresosOperativos(), style: "yellow-bold " },
      { details: "", style: "yellow" },
      { details: "", style: "yellow"},
      { details: " .  2.0 Total de Egresos", jan: "$"+TotalEgresos(), feb: "$"+TotalEgresos(), mar: "$"+TotalEgresos(), apr: "$"+TotalEgresos(), may: "$"+TotalEgresos(), jun: "$"+TotalEgresos(), jul: "$"+TotalEgresos(), aug: "$"+TotalEgresos(), sep: "$"+TotalEgresos(), oct: "$"+TotalEgresos(), nov: "$"+TotalEgresos(), dec: "$"+TotalEgresos(), style: "yellow-bold" },
      { details: "", style: "white-bold" },
      { details: "", style: "white-bold" },
      { details: "3.0 SALDO NETO", jan: "$"+SaldoNeto(), feb: "$"+SaldoNeto(), mar: "$"+SaldoNeto(), apr: "$"+SaldoNeto(), may: "$"+SaldoNeto(), jun: "$"+SaldoNeto(), jul: "$"+SaldoNeto(), aug: "$"+SaldoNeto(), sep: "$"+SaldoNeto(), oct: "$"+SaldoNeto(), nov: "$"+SaldoNeto(), dec: "$"+SaldoNeto(), style: "aqua-bold" },
      { details: "4.0 SALDO ACUMULADO", jan: "$"+SaldoAcumulado(), feb: "$"+SaldoAcumulado(), mar: "$"+SaldoAcumulado(), apr: "$"+SaldoAcumulado(), may: "$"+SaldoAcumulado(), jun: "$"+SaldoAcumulado(), jul: "$"+SaldoAcumulado(), aug: "$"+SaldoAcumulado(), sep: "$"+SaldoAcumulado(), oct: "$"+SaldoAcumulado(), nov: "$"+SaldoAcumulado(), dec: "$"+SaldoAcumulado(), style: "aqua-bold" },
    ];
  }, [datos]);
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

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
      <h1 className="text-black font-semibold text-4xl mt-5 mb-6 text-center">FLUJO DE CAJA</h1>
      <p className="text-xl text-gray-700 font-bold mb-3 text-center">Selecciona la fecha</p>

      <div className="date-selector flex flex-col md:flex-row items-center gap-4 justify-center">
        <div className="flex flex-col">
          <label htmlFor="fechaInicio" className="text-sm font-medium mb-1">Fecha Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="fechaFin" className="text-sm font-medium mb-1">Fecha Fin:</label>
          <input
            type="date"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={enviarFechaPorPost}
          className="px-6 py-2 bg-blue-600 text-white font-medium text-sm rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
        >
          Enviar Fechas
        </button>
      </div>
    </div>
  </div>

  <br />
  {/* TABLA FLUJO DE CAJA */}
  <br />
  <select
    name="Historial de flujo Caja"
    id="historial"
    className="block mx-auto mb-6 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
  >
    <option value="1">Año 1</option>
    <option value="2">Historial 2</option>
    <option value="3">Historial 3</option>
  </select>
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
