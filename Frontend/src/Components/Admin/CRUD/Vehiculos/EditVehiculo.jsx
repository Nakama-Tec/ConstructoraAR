import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useVehiculoStore from '../../../../Context/useVehiculoStore';
import { URL_VEHICULOS_EDITAR } from '../../../../Constants/endpoints-API';

const EditVehiculo = ({ onVehiculoEditado }) => {

    const { vehiculoSeleccionado, clearVehiculoSeleccionado } = useVehiculoStore();
    const token = useAuthStore((state) => state.token);
  
    const handleEditarVehiculo = () => {
      Swal.fire({
        title: 'Editar Vehículo',
        html: `
          <input id="patenteVehiculo" class="swal2-input" value="${vehiculoSeleccionado.patenteVehiculo}" />
          
          <input id="marcaVehiculo" class="swal2-input" value="${vehiculoSeleccionado.marcaVehiculo}" />
          
          <input id="tipoVehiculo" class="swal2-input" value="${vehiculoSeleccionado.tipoVehiculo}" />
          
          <input id="seguroVehiculo" class="swal2-input" value="${vehiculoSeleccionado.seguroVehiculo}" />
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
            await axios.put(`${URL_VEHICULOS_EDITAR}${vehiculoSeleccionado.id_vehiculo}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El vehículo fue actualizado correctamente.', 'success');
            onVehiculoEditado(); 
            clearVehiculoSeleccionado(); 
          } catch (error) {
            console.error('Error al actualizar vehículo:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el vehículo.', 'error');
          }
        } else {
          clearVehiculoSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (vehiculoSeleccionado) {
        handleEditarVehiculo();
      }
    }, [vehiculoSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditVehiculo
