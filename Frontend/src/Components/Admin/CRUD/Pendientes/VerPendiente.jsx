import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useRegistroStore from '../../../../Context/useRegistroStore';

const VerPendiente = ({ onPendientesVer }) => {

    const { registroSeleccionado } = useRegistroStore();
  
    const handleVerVehiculos = () => {
        Swal.fire({
          title: 'Información del Pendiente',
          icon: 'info',
          html: `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <tbody>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Descripción:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.Descripcion}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Estado Actual:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.estado}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha de Creación:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.fechaCreacion}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha de Límite:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.fechaLimite}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Prioridad:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.prioridad}</td>
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
        handleVerVehiculos();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default VerPendiente
