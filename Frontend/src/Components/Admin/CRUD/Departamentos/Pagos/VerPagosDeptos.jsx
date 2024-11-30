import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useVerRegistroStore from '../../../../../Context/useVerRegistroStore';

const VerPagosDeptos = ({ onPagoDeptoVer }) => {

    const { verRegistroSeleccionado, clearVerRegistroSeleccionado } = useVerRegistroStore();
  
    const handleVerPagoDeptos = () => {
        Swal.fire({
          title: 'Información del Departamento Pagado',
          icon: 'info',
          html: `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <tbody>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Nombre Departamento:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.NombreDepartamento}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Monto del Pago:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.MontoPagoAlquiler}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Cliente:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.NombreCliente} ${verRegistroSeleccionado.ApellidoCliente}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha de Pago:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.FechaPagoAlquiler}</td>
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
        handleVerPagoDeptos();
      }
    }, [verRegistroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };


export default VerPagosDeptos
