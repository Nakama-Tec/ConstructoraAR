import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_REMUNERACIONES_EDITAR } from '../../../../Constants/endpoints-API';


const EditarRemuneracion = ({onRemuneracionEditada}) => {
    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
  
    const handleEditarRemuneracion = () => {
      Swal.fire({
        title: 'Editar Usuario',
        html: `
            <input id="detalle" class="swal2-input" value="${registroSeleccionado.detalle}" />
            <input id="montoRemuneracion" class="swal2-input" value="${registroSeleccionado.montoRemuneracion}" />
            <input id="cantEmpleado" class="swal2-input" value="${registroSeleccionado.cantEmpleado}" />
            <select id="tipoEmpleado" class="swal2-select">
              <option value="0" ${registroSeleccionado.rol === 'Admin' ? 'selected' : ''}>Admin</option>
              <option value="1" ${registroSeleccionado.rol === 'Obrero' ? 'selected' : ''}>Obrero</option>
            </select>
            <select id="sectorRemuneracion" class="swal2-select">
              <option value="0" ${registroSeleccionado.rol === 'Publico' ? 'selected' : ''}>Publico</option>
              <option value="1" ${registroSeleccionado.rol === 'Privado' ? 'selected' : ''}>Privado</option>
            </select>
            <input id="fechaRemuneracion" placeholder="Fecha" class="swal2-input" type="date"/>

  
  
          
        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const detalle = Swal.getPopup().querySelector('#detalle').value;
          const montoRemuneracion = Swal.getPopup().querySelector('#montoRemuneracion').value;
          const cantEmpleado = Swal.getPopup().querySelector('#cantEmpleado').value;
          const tipoEmpleado = Swal.getPopup().querySelector('#tipoEmpleado').value;
          const fechaRemuneracion = Swal.getPopup().querySelector('#fechaRemuneracion').value;
          const sectorRemuneracion = Swal.getPopup().querySelector('#sectorRemuneracion').value;

          
  
          if (!detalle || !montoRemuneracion || !cantEmpleado || !tipoEmpleado || !fechaRemuneracion || !sectorRemuneracion) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          }
  
          return {
            detalle,
            montoRemuneracion,
            cantEmpleado,
            tipoEmpleado,
            fechaRemuneracion,
            sectorRemuneracion

          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`${URL_REMUNERACIONES_EDITAR}${registroSeleccionado.id_remuneracion}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'La remuneracion fue actualizado correctamente.', 'success');
            onRemuneracionEditada(); 
            clearRegistroSeleccionado(); 
          } catch (error) {
            console.error('Error al actualizar la rumuneracion:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar la remuneracion.', 'error');
          }
        } else {
          clearRegistroSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (registroSeleccionado) {
        handleEditarRemuneracion();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };
  

export default EditarRemuneracion