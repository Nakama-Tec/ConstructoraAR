import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_VEHICULOS_EDITAR } from '../../../../Constants/endpoints-API';

const EditVehiculo = ({ onVehiculoEditado }) => {

    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleEditarVehiculo = () => {
      Swal.fire({
        title: 'Editar Vehículo',
        html: `
          <input id="patenteVehiculo" class="swal2-input" value="${registroSeleccionado.patenteVehiculo}" />
          
          <input id="marcaVehiculo" class="swal2-input" value="${registroSeleccionado.marcaVehiculo}" />
          
          <input id="tipoVehiculo" class="swal2-input" value="${registroSeleccionado.tipoVehiculo}" />
          
          <input id="seguroVehiculo" class="swal2-input" value="${registroSeleccionado.seguroVehiculo}" />
        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const patenteVehiculo = document.getElementById('patenteVehiculo').value;
          const marcaVehiculo = document.getElementById('marcaVehiculo').value;
          const tipoVehiculo = document.getElementById('tipoVehiculo').value;
          const seguroVehiculo = document.getElementById('seguroVehiculo').value;
  
          if (!patenteVehiculo || !marcaVehiculo || !tipoVehiculo || !seguroVehiculo) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          }
  
          return {
            patenteVehiculo,
            marcaVehiculo,
            tipoVehiculo,
            seguroVehiculo
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`${URL_VEHICULOS_EDITAR}${registroSeleccionado.id_vehiculo}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El vehículo fue actualizado correctamente.', 'success');
            onVehiculoEditado(); 
            clearRegistroSeleccionado(); 
          } catch (error) {
            console.error('Error al actualizar vehículo:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el vehículo.', 'error');
          }
        } else {
          clearRegistroSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (registroSeleccionado) {
        handleEditarVehiculo();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditVehiculo
