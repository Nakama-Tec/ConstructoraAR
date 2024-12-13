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

  const TotalIngresos =()=>{
    let total = 0;
    for (let i = 0; i < 6; i++) {
      total += parseFloat(datos[i].Monto);
    }

    console.log("Total Ingresos = ", total);
    return total;

  }

  const TotalEgresosConsumo = () =>{
    let total = 0;
    for (let i = 6; i < 9; i++) {
      total += parseFloat(datos[i].Monto);
    }

    console.log("Total Egresos Consumo = ", total);
    return total;
  }

  const TotalEgresosOperativos = () =>{
    let total = 0;
    for (let i = 9; i < 21; i++) {
      total += parseFloat(datos[i].Monto);
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
      { details: ' .  1.1  Ingresos por Ventas de Terrenos', jan: "$"+datos[0].Monto, feb: "$"+datos[0].Monto, mar: "$"+datos[0].Monto, apr: "$"+datos[0].Monto, may: "$"+datos[0].Monto, jun: "$"+datos[0].Monto, jul: "$"+datos[0].Monto, aug: "$"+datos[0].Monto, sep: "$"+datos[0].Monto, oct: "$"+datos[0].Monto, nov: "$"+datos[0].Monto, dec: "$"+datos[0].Monto, style: "green" },
      { details: ' .  1.2  Ingresos por Alquiler duplex', jan: "$"+datos[1].Monto, feb: "$"+datos[1].Monto, mar: "$"+datos[1].Monto, apr: "$"+datos[1].Monto, may: "$"+datos[1].Monto, jun: "$"+datos[1].Monto, jul: "$"+datos[1].Monto, aug: "$"+datos[1].Monto, sep: "$"+datos[1].Monto, oct: "$"+datos[1].Monto, nov: "$"+datos[1].Monto, dec: "$"+datos[1].Monto, style: "green" },
      { details: ' .  1.3  Ingresos por Obras Privadas', jan: "$"+datos[2].Monto, feb: "$"+datos[2].Monto, mar: "$"+datos[2].Monto, apr: "$"+datos[2].Monto, may: "$"+datos[2].Monto, jun: "$"+datos[2].Monto, jul: "$"+datos[2].Monto, aug: "$"+datos[2].Monto, sep: "$"+datos[2].Monto, oct: "$"+datos[2].Monto, nov: "$"+datos[2].Monto, dec: "$"+datos[2].Monto, style: "green" },
      { details: ' .  1.4  Ingresos por Obras Publicas', jan: "$"+datos[3].Monto, feb: "$"+datos[3].Monto, mar: "$"+datos[3].Monto, apr: "$"+datos[3].Monto, may: "$"+datos[3].Monto, jun: "$"+datos[3].Monto, jul: "$"+datos[3].Monto, aug: "$"+datos[3].Monto, sep: "$"+datos[3].Monto, oct: "$"+datos[3].Monto, nov: "$"+datos[3].Monto, dec: "$"+datos[3].Monto, style: "green" },
      { details: ' .  1.5  Cobro de Deudas', jan: "$"+datos[4].Monto, feb: "$"+datos[4].Monto, mar: "$"+datos[4].Monto, apr: "$"+datos[4].Monto, may: "$"+datos[4].Monto, jun: "$"+datos[4].Monto, jul: "$"+datos[4].Monto, aug: "$"+datos[4].Monto, sep: "$"+datos[4].Monto, oct: "$"+datos[4].Monto, nov: "$"+datos[4].Monto, dec: "$"+datos[4].Monto, style: "green" },
      { details: ' .  1.6  Otros Ingresos', jan: "$"+datos[5].Monto, feb: "$"+datos[5].Monto, mar: "$"+datos[5].Monto, apr: "$"+datos[5].Monto, may: "$"+datos[5].Monto, jun: "$"+datos[5].Monto, jul: "$"+datos[5].Monto, aug: "$"+datos[5].Monto, sep: "$"+datos[5].Monto, oct: "$"+datos[5].Monto, nov: "$"+datos[5].Monto, dec: "$"+datos[5].Monto, style: "green" },
      { details: " .  1.0 Total de Ingresos", jan: "$"+TotalIngresos(), feb: "$"+TotalIngresos(), mar: "$"+TotalIngresos(), apr: "$"+TotalIngresos(), may: "$"+TotalIngresos(), jun: "$"+TotalIngresos(), jul: "$"+TotalIngresos(), aug: "$"+TotalIngresos(), sep: "$"+TotalIngresos(), oct: "$"+TotalIngresos(), nov: "$"+TotalIngresos(), dec: "$"+TotalIngresos(), style: "green-bold" },
      { details: "", style: "white-bold" },
      { details: "", style: "white-bold" },
      { details: "2. Detalle de Egresos", style: "yellow-bold" },
      { details: " .  2.1 Luz", jan: "$"+datos[6].Monto, feb: "$"+datos[6].Monto, mar: "$"+datos[6].Monto, apr: "$"+datos[6].Monto, may: "$"+datos[6].Monto, jun: "$"+datos[6].Monto, jul: "$"+datos[6].Monto, aug: "$"+datos[6].Monto, sep: "$"+datos[6].Monto, oct: "$"+datos[6].Monto, nov: "$"+datos[6].Monto, dec: "$"+datos[6].Monto, style: "yellow" },
      { details: " .  2.2 Agua", jan: "$"+datos[7].Monto, feb: "$"+datos[7].Monto, mar: "$"+datos[7].Monto, apr: "$"+datos[7].Monto, may: "$"+datos[7].Monto, jun: "$"+datos[7].Monto, jul: "$"+datos[7].Monto, aug: "$"+datos[7].Monto, sep: "$"+datos[7].Monto, oct: "$"+datos[7].Monto, nov: "$"+datos[7].Monto, dec: "$"+datos[7].Monto, style: "yellow" },
      { details: " .  2.3 Teléfono", jan: "$"+datos[8].Monto, feb: "$"+datos[8].Monto, mar: "$"+datos[8].Monto, apr: "$"+datos[8].Monto, may: "$"+datos[8].Monto, jun: "$"+datos[8].Monto, jul: "$"+datos[8].Monto, aug: "$"+datos[8].Monto, sep: "$"+datos[8].Monto, oct: "$"+datos[8].Monto, nov: "$"+datos[8].Monto, dec: "$"+datos[8].Monto, style: "yellow" },
      { details: " -      Egresos en Consumo", jan: "$"+TotalEgresosConsumo(), feb: "$"+TotalEgresosConsumo(), mar: "$"+TotalEgresosConsumo(), apr: "$"+TotalEgresosConsumo(), may: "$"+TotalEgresosConsumo(), jun: "$"+TotalEgresosConsumo(), jul: "$"+TotalEgresosConsumo(), aug: "$"+TotalEgresosConsumo(), sep: "$"+TotalEgresosConsumo(), oct: "$"+TotalEgresosConsumo(), nov: "$"+TotalEgresosConsumo(), dec: "$"+TotalEgresosConsumo(), style: "yellow-bold" },
      { details: "", style: "yellow" },
      { details: "", style: "yellow" },
      { details: ' .  2.4  Compra de Elementos de Oficina', jan: "$"+datos[9].Monto, feb: "$"+datos[9].Monto, mar: "$"+datos[9].Monto, apr: "$"+datos[9].Monto, may: "$"+datos[9].Monto, jun: "$"+datos[9].Monto, jul: "$"+datos[9].Monto, aug: "$"+datos[9].Monto, sep: "$"+datos[9].Monto, oct: "$"+datos[9].Monto, nov: "$"+datos[9].Monto, dec: "$"+datos[9].Monto, style: "yellow" },
      { details: ' .  2.5  Compra de Materiales de Obra', jan: "$"+datos[10].Monto, feb: "$"+datos[10].Monto, mar: "$"+datos[10].Monto, apr: "$"+datos[10].Monto, may: "$"+datos[10].Monto, jun: "$"+datos[10].Monto, jul: "$"+datos[10].Monto, aug: "$"+datos[10].Monto, sep: "$"+datos[10].Monto, oct: "$"+datos[10].Monto, nov: "$"+datos[10].Monto, dec: "$"+datos[10].Monto, style: "yellow" },
      { details: ' .  2.6  Salarios Administrativos', jan: "$"+datos[11].Monto, feb: "$"+datos[11].Monto, mar: "$"+datos[11].Monto, apr: "$"+datos[11].Monto, may: "$"+datos[11].Monto, jun: "$"+datos[11].Monto, jul: "$"+datos[11].Monto, aug: "$"+datos[11].Monto, sep: "$"+datos[11].Monto, oct: "$"+datos[11].Monto, nov: "$"+datos[11].Monto, dec: "$"+datos[11].Monto, style: "yellow" },
      { details: ' .  2.7  Salarios de Obras Privadas', jan: "$"+datos[12].Monto, feb: "$"+datos[12].Monto, mar: "$"+datos[12].Monto, apr: "$"+datos[12].Monto, may: "$"+datos[12].Monto, jun: "$"+datos[12].Monto, jul: "$"+datos[12].Monto, aug: "$"+datos[12].Monto, sep: "$"+datos[12].Monto, oct: "$"+datos[12].Monto, nov: "$"+datos[12].Monto, dec: "$"+datos[12].Monto, style: "yellow" },
      { details: ' .  2.8  Salarios de Obras Públicas', jan: "$"+datos[13].Monto, feb: "$"+datos[13].Monto, mar: "$"+datos[13].Monto, apr: "$"+datos[13].Monto, may: "$"+datos[13].Monto, jun: "$"+datos[13].Monto, jul: "$"+datos[13].Monto, aug: "$"+datos[13].Monto, sep: "$"+datos[13].Monto, oct: "$"+datos[13].Monto, nov: "$"+datos[13].Monto, dec: "$"+datos[13].Monto, style: "yellow" },
      { details: ' .  2.9  Pagos a Tercerizados O.Privadas', jan: "$"+datos[14].Monto, feb: "$"+datos[14].Monto, mar: "$"+datos[14].Monto, apr: "$"+datos[14].Monto, may: "$"+datos[14].Monto, jun: "$"+datos[14].Monto, jul: "$"+datos[14].Monto, aug: "$"+datos[14].Monto, sep: "$"+datos[14].Monto, oct: "$"+datos[14].Monto, nov: "$"+datos[14].Monto, dec: "$"+datos[14].Monto, style: "yellow" },
      { details: ' .  2.10 Pagos a Tercerizados O.Públicas', jan: "$"+datos[15].Monto, feb: "$"+datos[15].Monto, mar: "$"+datos[15].Monto, apr: "$"+datos[15].Monto, may: "$"+datos[15].Monto, jun: "$"+datos[15].Monto, jul: "$"+datos[15].Monto, aug: "$"+datos[15].Monto, sep: "$"+datos[15].Monto, oct: "$"+datos[15].Monto, nov: "$"+datos[15].Monto, dec: "$"+datos[15].Monto, style: "yellow" },
      { details: ' .  2.11 Administración y Ventas', jan: "$"+datos[16].Monto, feb: "$"+datos[16].Monto, mar: "$"+datos[16].Monto, apr: "$"+datos[16].Monto, may: "$"+datos[16].Monto, jun: "$"+datos[16].Monto, jul: "$"+datos[16].Monto, aug: "$"+datos[16].Monto, sep: "$"+datos[16].Monto, oct: "$"+datos[16].Monto, nov: "$"+datos[16].Monto, dec: "$"+datos[16].Monto, style: "yellow" },
      { details: ' .  2.12 Impuestos', jan: "$"+datos[17].Monto, feb: "$"+datos[17].Monto, mar: "$"+datos[17].Monto, apr: "$"+datos[17].Monto, may: "$"+datos[17].Monto, jun: "$"+datos[17].Monto, jul: "$"+datos[17].Monto, aug: "$"+datos[17].Monto, sep: "$"+datos[17].Monto, oct: "$"+datos[17].Monto, nov: "$"+datos[17].Monto, dec: "$"+datos[17].Monto, style: "yellow" },
      { details:' .  2.13 Amortizaciones', jan: "$"+datos[18].Monto, feb: "$"+datos[18].Monto, mar: "$"+datos[18].Monto, apr: "$"+datos[18].Monto, may: "$"+datos[18].Monto, jun: "$"+datos[18].Monto, jul: "$"+datos[18].Monto, aug: "$"+datos[18].Monto, sep: "$"+datos[18].Monto, oct: "$"+datos[18].Monto, nov: "$"+datos[18].Monto, dec: "$"+datos[18].Monto, style: "yellow" },
      { details:' .  2.14 Intereses', jan: "$"+datos[19].Monto, feb: "$"+datos[19].Monto, mar: "$"+datos[19].Monto, apr: "$"+datos[19].Monto, may: "$"+datos[19].Monto, jun: "$"+datos[19].Monto, jul: "$"+datos[19].Monto, aug: "$"+datos[19].Monto, sep: "$"+datos[19].Monto, oct: "$"+datos[19].Monto, nov: "$"+datos[19].Monto, dec: "$"+datos[19].Monto, style: "yellow" },
      { details:' .  2.15 Otros Egresos', jan: "$"+datos[20].Monto, feb: "$"+datos[20].Monto, mar: "$"+datos[20].Monto, apr: "$"+datos[20].Monto, may: "$"+datos[20].Monto, jun: "$"+datos[20].Monto, jul: "$"+datos[20].Monto, aug: "$"+datos[20].Monto, sep: "$"+datos[20].Monto, oct: "$"+datos[20].Monto, nov: "$"+datos[20].Monto, dec: "$"+datos[20].Monto, style: "yellow" },
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
        <h1>Gestión de Fechas</h1>

        <div className="date-selector">
          <label htmlFor="fechaInicio">Fecha Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />

          <label htmlFor="fechaFin">Fecha Fin:</label>
          <input
            type="date"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        <Button variant="primary" onClick={enviarFechaPorPost}>
          Enviar Fechas
        </Button>
      </div>
    </div>




      <br />
      {/* <b><h2>Fecha Actual : {fechaActual}</h2></b> */}
      <br />
      <select name="Historial de flujo Caja" id="historial">
        <option value="1">Año 1</option>
        <option value="2">Historial 2</option>
        <option value="3">Historial 3</option>
      </select>
      <b><h2 style={{ textAlign: "center", color: "black" }}>Flujo de Caja</h2></b>

      <table {...getTableProps()} className="cash-flow-table">
        <thead>
          {headerGroups.map((headerGroup,index) => (
            <tr {...headerGroup.getHeaderGroupProps() } key={index}>
              {headerGroup.headers.map((column,index) => (
                <th {...column.getHeaderProps()} key={index}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row,index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={row.original.style} key={index}>
                {row.cells.map((cell,index) => (
                  <td {...cell.getCellProps()} key={index}>{cell.render("Cell")}</td>
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
