import { useEffect } from 'react';
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
          <label><b>Patente</b></label> 
          <br>
          <input id="patenteVehiculo" class="swal2-input" value="${registroSeleccionado.patenteVehiculo}" />
          <br>
          <br>
          <label><b>Marca</b></label> 
          <br>
          <input id="marcaVehiculo" class="swal2-input" value="${registroSeleccionado.marcaVehiculo}" />
          <br>
          <br>
          <label><b>Seguro Vehiculo</b></label> 
          <br>
          <input id="seguroVehiculo" class="swal2-input" value="${registroSeleccionado.seguroVehiculo}" />

          <br/>
          <br/>
          <label><strong>Selecciona el tipo de vehiculo:</strong></label>
          <br/>
          <select id="tipoVehiculo" class="swal2-select">
          <option value="Camión" ${registroSeleccionado.seguroVehiculo === 'Camión' ? 'selected' : ''}>Camión</option>
          <option value="Auto" ${registroSeleccionado.seguroVehiculo === 'Auto' ? 'selected' : ''}>Auto</option>
        </select>
        <br/>
        `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      preConfirm: () => {
        const patenteVehiculo = document.getElementById('patenteVehiculo').value.trim().replace(/\s+/g, '').toUpperCase();
        const marcaVehiculo = document.getElementById('marcaVehiculo').value;
        const tipoVehiculo = document.getElementById('tipoVehiculo').value;
        const seguroVehiculo = document.getElementById('seguroVehiculo').value;

        // Validaciones
        const patenteRegex = /^[a-zA-Z0-9]+$/;
        const marcaRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
        const seguroRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

        if (!patenteRegex || !marcaRegex.test(marcaVehiculo)) {
          Swal.showValidationMessage('La patente no debe contener caracteres especiales.');
          return false;
        }

        if (!marcaVehiculo || !marcaRegex.test(marcaVehiculo)) {
          Swal.showValidationMessage('La marca no debe contener números ni caracteres especiales.');
          return false;
        }

        if (!seguroVehiculo || !seguroRegex.test(seguroVehiculo)) {
          Swal.showValidationMessage('El seguro no debe contener números ni caracteres especiales.');
          return false;
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
