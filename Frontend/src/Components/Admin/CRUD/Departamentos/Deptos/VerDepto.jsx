import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useRegistroStore from '../../../../../Context/useRegistroStore';

const VerDepto = ({ onDeptoVer }) => {

    const { registroSeleccionado } = useRegistroStore();
  
    const handleVerDeptos = () => {
        Swal.fire({
          title: 'Información del Departamento',
          icon: 'info',
          html: `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <tbody>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Nombre Departamento:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.nombreDepartamento}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Dirección:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.direccionDepartamento}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Descripción:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.descripcionDepartamento}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Precio Departamento:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.precioDepartamento}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Precio Expensa:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.precioExpensa}</td>
                </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Servicios:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.serviciosIncluidos}</td>
                </tr>
              <tr>
               <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Contrato:</th>
               <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.contratoDescripcion}</td>
              </tr>
              <tr>
              <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Disponibilidad:</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registroSeleccionado.disponibilidadDepartamento == 1 ? "Si" : "No"}</td>
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
        handleVerDeptos();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default VerDepto
