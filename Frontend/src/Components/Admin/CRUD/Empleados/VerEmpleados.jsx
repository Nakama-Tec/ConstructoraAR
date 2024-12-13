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
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">DNI:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.dniEmpleado}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Télefono:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.telefonoEmpleado}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Dirección:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.direccionEmpleado}</td>
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
