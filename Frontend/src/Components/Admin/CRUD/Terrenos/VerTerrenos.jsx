import { useEffect } from 'react';
import Swal from 'sweetalert2';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';

const VerTerrenos = ({onTerrenoVer}) => {
  const { verRegistroSeleccionado, clearVerRegistroSeleccionado } = useVerRegistroStore();

  const handleVerTerreno = () => {
    Swal.fire({
      title: 'Información del Terreno',
      icon: 'info',
      html: `
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
          <tbody>
            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Metros:</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.metrosTerrenos}m²</td>
            </tr>
            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Dirección:</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.direccionTerreno}</td>
            </tr>
            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Precio:</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${verRegistroSeleccionado.precioTerreno}</td>
            </tr>
            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Disponibilidad:</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.disponibilidadTerreno === 1 ? "Si" : "No"}</td>
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
      handleVerTerreno();
    }
  }, [verRegistroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default VerTerrenos;
