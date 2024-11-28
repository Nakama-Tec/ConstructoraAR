import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useRegistroStore from '../../../../../Context/useRegistroStore';


const VerVtaTerrenos = ({ onVtaTerrenoVer }) => {

    const { registroSeleccionado } = useRegistroStore();
  
    const handleVerVtaTerreno = () => {
        Swal.fire({
          title: 'Información del Terreno Vendido',
          icon: 'info',
          html: `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <tbody>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Dirección:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.DireccionTerreno}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Precio:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.PrecioTerreno}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Cliente:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.NombreCliente} ${registroSeleccionado.ApellidoCliente}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Telefono:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.TelefonoCliente}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Condición:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.CondicionCliente}</td>
                </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha de Venta:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.FechaVentaTerreno}</td>
                </tr>
              </tbody>
            </table>
          `,
          confirmButtonText: 'Cerrar',
          customClass: {
            popup: 'swal-wide',
          },
          width: '600px', // Aumentar el ancho del modal para mejor presentación
        });
      };
  
    useEffect(() => {
      if (registroSeleccionado) {
        handleVerVtaTerreno();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };


export default VerVtaTerrenos
