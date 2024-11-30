import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';

const VerPendiente = ({ onPendientesVer }) => {

    const { verRegistroSeleccionado, clearVerRegistroSeleccionado } = useVerRegistroStore();
  
    const handleVerVehiculos = () => {
        Swal.fire({
          title: 'Información del Pendiente',
          icon: 'info',
          html: `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <tbody>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Descripción:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.Descripcion}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Estado Actual:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.estado}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha de Creación:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.fechaCreacion}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha de Límite:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.fechaLimite}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Prioridad:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.prioridad}</td>
                </tr>
              </tbody>
            </table>
          `,
          confirmButtonText: 'Cerrar',
          customClass: {
            popup: 'swal-wide',
          },
          width: '600px', // Aumentar el ancho del modal para mejor presentación
          didClose: () => {
            clearVerRegistroSeleccionado(); // Limpiar los registros al cerrar el modal
          },
        });
      };
  
    useEffect(() => {
      if (verRegistroSeleccionado) {
        handleVerVehiculos();
      }
    }, [verRegistroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default VerPendiente
