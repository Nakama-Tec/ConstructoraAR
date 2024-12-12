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
  // const [fechaInicio, setFechaInicio] = useState('');
  // const [fechaFin, setFechaFin] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [prueba, setPrueba] = useState([]);
  // const [año, setAño] = useState('');
  // const [mes, setMes] = useState('');
  const [datos, setDatos] = useState([]);


  // setFechaInicio(`${año}-01-01`);
  // setFechaFin(`${año}-01-31`);

//   (function saludo() {
//     console.log("Soy una IIFE con una función nombrada");
// })();

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

console.log("fechaInicio = ", fechaInicio);
console.log("fechaFin = ", fechaFin);
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

        // setDatos(response.data);
        //obtenerDatosPorGet(); // Llama al GET después del POST
        setDatos(response.data); // Guarda la respuesta en el estado

        
      }
    } catch (error) {
      console.error('Error al enviar la fecha por POST:', error);
    }
  };



console.log("datos = ");

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

  const data = React.useMemo(
    () => [
      { details: "1. Detalle de Ingresos", style: "green-bold" },
      { details: ' .  1.1  Ingresos por Ventas de Terrenos', jan: datos[0].Monto_1, feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "green" },
      { details: ' .  1.2  Ingresos por Alquiler duplex', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "green" },
      { details: ' .  1.3  Ingresos por Obras Privadas', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "green" },
      { details: ' .  1.4  Ingresos por Obras Publicas', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "green" },
      { details: ' .  1.5  Cobro de Deudas', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "green" },
      { details: ' .  1.6  Otros Ingresos', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "green" },
      { details: " .  1.0 Total de Ingresos", jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "green-bold" },
      { details: "", style: "white-bold" },
      { details: "", style: "white-bold" },
      { details: "2. Detalle de Egresos", style: "yellow-bold" },
      { details: " .  2.1 Luz", jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: " .  2.2 Agua", jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: " .  2.3 Teléfono", jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: " -      Egresos en Consumo", jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow-bold" },
      { details: "", style: "yellow" },
      { details: "", style: "yellow" },
      { details: ' .  2.4  Compra de Elementos de Oficina', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: ' .  2.5  Compra de Materiales de Obra', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: ' .  2.6  Salarios Administrativos', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: ' .  2.7  Salarios de Obras Privadas', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: ' .  2.8  Salarios de Obras Públicas', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: ' .  2.9  Pagos a Tercerizados O.Privadas', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: ' .  2.10 Pagos a Tercerizados O.Públicas', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: ' .  2.11 Administración y Ventas', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: ' .  2.12 Impuestos', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details:' .  2.13 Amortizaciones', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details:' .  2.14 Intereses', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow" },
      { details: ' -      Egresos Operativos', jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow-bold " },
      { details: "", style: "yellow" },
      { details: "", style: "yellow"},
      { details: " .  2.0 Total de Egresos", jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "yellow-bold" },
      { details: "", style: "white-bold" },
      { details: "", style: "white-bold" },
      { details: "3.0 SALDO NETO", jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "aqua-bold" },
      { details: "4.0 SALDO ACUMULADO", jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", style: "aqua-bold" },
    ],
    []
  );
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

 // Obtener la fecha actual en formato YYYY-MM-DD
 useEffect(() => {
  
  const fechaInicio = obtenerFechaInicio();
  const fechaFin = obtenerFechaFin();
    setFechaInicio(fechaInicio);
    setFechaFin(fechaFin); // Puedes ajustar esto según tus necesidades
    enviarFechaPorPost()
  
}, []); 

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
