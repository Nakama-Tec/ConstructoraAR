import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_PENDIENTES_EDITAR } from '../../../../Constants/endpoints-API';

const EditarPendiente = ({ onPendienteEditado }) => {

    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleEditarPendiente = () => {
      Swal.fire({
        title: 'Editar Pendiente',
        html: `
          <input id="Descripcion" class="swal2-input" value="${registroSeleccionado.Descripcion}" />
      
          
          <input id="fechaCreacion" class="swal2-input" value="${registroSeleccionado.fechaCreacion}" />
          
          <input id="fechaLimite" class="swal2-input" value="${registroSeleccionado.fechaLimite}" />
          
          <select id="estado" class="swal2-select">
            <option value="Pendiente" ${registroSeleccionado.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
            <option value="En Progreso" ${registroSeleccionado.estado === 'En Progreso' ? 'selected' : ''}>En Progreso</option>
            <option value="Completado" ${registroSeleccionado.estado === 'Completado' ? 'selected' : ''}>Completado</option>
          </select>
          <br>
      <select id="prioridad" class="swal2-select">
        <option value="Baja" ${registroSeleccionado.prioridad === 'Baja' ? 'selected' : ''}>Baja</option>
        <option value="Media" ${registroSeleccionado.prioridad === 'Media' ? 'selected' : ''}>Media</option>
        <option value="Alta" ${registroSeleccionado.prioridad === 'Alta' ? 'selected' : ''}>Alta</option>
      </select>
        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const Descripcion = document.getElementById('Descripcion').value;
          const estado = document.getElementById('estado').value;
          const fechaCreacion = document.getElementById('fechaCreacion').value;
          const fechaLimite = document.getElementById('fechaLimite').value;
          const prioridad = document.getElementById('prioridad').value;
  
          if (!Descripcion || !estado || !fechaCreacion || !fechaLimite || !prioridad) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          }
  
          return {
            Descripcion,
            estado,
            fechaCreacion,
            fechaLimite,
            prioridad
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`${URL_PENDIENTES_EDITAR}${registroSeleccionado.id_pendiente}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El pendiente fue actualizado correctamente.', 'success');
            onPendienteEditado(); 
            clearRegistroSeleccionado(); 
          } catch (error) {
            console.error('Error al actualizar pendiente:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el pendiente.', 'error');
          }
        } else {
          clearRegistroSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (registroSeleccionado) {
        handleEditarPendiente();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditarPendiente
