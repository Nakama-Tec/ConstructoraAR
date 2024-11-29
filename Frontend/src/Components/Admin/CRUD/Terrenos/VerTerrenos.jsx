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
        <div style="display: flex; justify-content: center; margin-bottom: 20px;">
          <img src="https://www.atbeydesarrollos.com/wp-content/uploads/2022/03/terreno-ideal-para-construir-casa.jpg" alt="Imagen del Terreno" 
               style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 8px;">
        </div>
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
          <tbody>
            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Metros:</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.metrosTerrenos}</td>
            </tr>
            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Dirección:</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.direccionTerreno}</td>
            </tr>
            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Precio:</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.precioTerreno}</td>
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
