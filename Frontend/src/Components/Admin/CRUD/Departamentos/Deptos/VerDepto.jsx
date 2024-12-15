import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useVerRegistroStore from '../../../../../Context/useVerRegistroStore';

const VerDepto = ({ onDeptoVer }) => {

    const { verRegistroSeleccionado, clearVerRegistroSeleccionado } = useVerRegistroStore();
  
    const handleVerDeptos = () => {
        Swal.fire({
          title: 'Información del Departamento',
          icon: 'info',
          html: `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <tbody>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Nombre Departamento:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.nombreDepartamento}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Dirección:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.direccionDepartamento}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Descripción:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.descripcionDepartamento}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Precio Departamento:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${verRegistroSeleccionado.precioDepartamento}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Precio Expensa:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${verRegistroSeleccionado.precioExpensa}</td>
                </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Servicios:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.serviciosIncluidos == 0 ? "No Incluido" : "Incluido"}</td>
                </tr>
              <tr>
               <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Contrato:</th>
               <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.contratoDescripcion}</td>
              </tr>
              <tr>
              <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Disponibilidad:</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.disponibilidadDepartamento == 1 ? "Si" : "No"}</td>
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
        handleVerDeptos();
      }
    }, [verRegistroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default VerDepto
