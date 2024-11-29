import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';

const VerVehiculo = ({ onVehiculoVer }) => {

  const { verRegistroSeleccionado, clearVerRegistroSeleccionado } = useVerRegistroStore();
  
  const handleVerVehiculos = () => {
      Swal.fire({
        title: 'Información del Vehiculo',
        icon: 'info',
        html: `
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <tbody>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Patente:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.patenteVehiculo}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Marca:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.marcaVehiculo}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Tipo de Vehiculo:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.tipoVehiculo}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Seguro:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.seguroVehiculo}</td>
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

export default VerVehiculo
