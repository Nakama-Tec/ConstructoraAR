import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';

const VerEmpleados = ({ onEmpleadoVer }) => {

    const { verRegistroSeleccionado, clearVerRegistroSeleccionado } = useVerRegistroStore();
  
    const handleVerEmpleado = () => {
        Swal.fire({
          title: 'Información del Empleado',
          icon: 'info',
          html: `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <tbody>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Nombre:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.nombreEmpleado}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Apellido:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.apellidoEmpleado}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Condición:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.DNIEmpleado}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">CUIL:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.telefono}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Teléfono:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.direccion}</td>
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
        handleVerEmpleado();
      }
    }, [verRegistroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default VerEmpleados
