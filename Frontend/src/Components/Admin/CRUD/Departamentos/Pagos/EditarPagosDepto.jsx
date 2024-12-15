import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../../Context/useAuthStore';
import useRegistroStore from '../../../../../Context/useRegistroStore';
import { URL_PAGOS_ALQUILERES_EDITAR } from '../../../../../Constants/endpoints-API';

const EditarPagosDepto = ({ onPagoAlquilerEditado }) => {

    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleEditarPagoAlquiler = () => {
      Swal.fire({
        title: 'Editar Pago Alquiler',
        html: `
          <label><strong>Selecciona la fecha de pago:</strong></label>
          <br/>
          <input id="FechaPagoAlquiler" type="date" class="swal2-input" value="${registroSeleccionado.FechaPagoAlquiler}" />
           <br>
           <br>
           <label><b>Monto Pago Alquiler</b></label> 
           <br>
          <input id="MontoPagoAlquiler" type="number" min="0" class="swal2-input" value="${registroSeleccionado.MontoPagoAlquiler}" />
          <br>
          

        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const fechaPagoAlquiler = document.getElementById('FechaPagoAlquiler').value;
          const montoPagoAlquiler = document.getElementById('MontoPagoAlquiler').value;
  
          if (!montoPagoAlquiler || !fechaPagoAlquiler) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          }
  
          return {
            fechaPagoAlquiler,
            montoPagoAlquiler
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`${URL_PAGOS_ALQUILERES_EDITAR}${registroSeleccionado.id_pagoAlquiler}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El pago del alquiler fue actualizado correctamente.', 'success');
            onPagoAlquilerEditado(); 
            clearRegistroSeleccionado(); 
          } catch (error) {
            console.error('Error al actualizar el pago del aquiler:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el pago del alquiler.', 'error');
          }
        } else {
          clearRegistroSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (registroSeleccionado) {
        handleEditarPagoAlquiler();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditarPagosDepto
