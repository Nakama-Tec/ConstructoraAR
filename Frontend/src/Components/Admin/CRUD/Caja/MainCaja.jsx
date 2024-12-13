import React, { useEffect, useState } from "react";
import { useTable } from "react-table"; // npm install react-table
import "../../../../Styles/CashFlowTable.css"; // Asegúrate de usar esta hoja de estilos
import { URL_FLUJO_CAJA } from "../../../../Constants/endpoints-API";
import useAuthStore from "../../../../Context/useAuthStore";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Aside from "../../../Layout/Aside";
import toast, { Toaster } from "react-hot-toast";

const MainCaja = () => {
  const token = useAuthStore((state) => state.token);

  // Función para obtener la fecha actual en formato "YYYY-MM-DD"
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = (hoy.getMonth() + 1).toString().padStart(2, "0");
    const dia = hoy.getDate().toString().padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  };

  // Estado para las fechas inicializado con la fecha actual
  const [fechaInicio, setFechaInicio] = useState(obtenerFechaActual);
  const [fechaFin, setFechaFin] = useState(obtenerFechaActual);

  // Configurar fecha por defecto cuando el componente se monta
  useEffect(() => {
    const fechaActual = obtenerFechaActual();
    setFechaInicio(fechaActual);
    setFechaFin(fechaActual); // Puedes ajustar esto según tus necesidades
  }, []);

  console.log("fecha inicio", fechaInicio + " fecha fin", fechaFin);

  // Enviar la fecha por POST
  const enviarFechaPorPost = async () => {
    try {
      const response = await axios.post(
        `${URL_FLUJO_CAJA}/post`,
        { fechaInicio, fechaFin },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log("Fecha enviada con éxito Post:", response.data);
        toast.success("Fechas enviadas correctamente.");
      }
    } catch (error) {
      console.error("Error al enviar la fecha por POST:", error);
      toast.error("Error al enviar las fechas.");
    }
  };

  return (
    <div className="main-caja-container">
      <Toaster />
      <Aside />

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
  );
};

export default MainCaja;