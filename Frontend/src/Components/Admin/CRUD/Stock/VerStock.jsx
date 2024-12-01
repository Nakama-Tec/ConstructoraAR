import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';


const VerStock = ({ onStockVer }) => {
  const { verRegistroSeleccionado, clearVerRegistroSeleccionado } = useVerRegistroStore();
  
  const handleVerStock = () => {
      Swal.fire({
        title: 'Información de Stock',
        icon: 'info',
        html: `
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <tbody>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Nombre del material:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.nombreMaterial}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Ubicación del material:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.ubicacionStock}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Cantidad de material:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.cantidadStock}</td>
              </tr>
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
      handleVerStock();
    }
  }, [verRegistroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default VerStock
