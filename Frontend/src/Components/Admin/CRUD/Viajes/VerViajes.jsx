import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';


const VerViajes = ({ onViajeVer }) => {
    const { verRegistroSeleccionado, clearVerRegistroSeleccionado } = useVerRegistroStore();

    const handleVerViaje = () => {
        Swal.fire({
          title: 'Detalle del Viaje',
          icon: 'info',
          html: `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <tbody>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Nº Viaje :</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.id_DetallesViaje}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Obra :</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.nombreObra}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.fechaViaje}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Patente:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.patenteVehiculo}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Direccion:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.direccionObra}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Tipo Vehiculo:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.tipoVehiculo}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Material:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.nombreMaterial}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Deposito:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.ubicacionStock}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Cantidad Material:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.cantidadStock}</td>
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
        handleVerViaje();
      }
    }, [verRegistroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default VerViajes
