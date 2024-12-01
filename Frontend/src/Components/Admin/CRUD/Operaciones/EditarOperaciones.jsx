import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_OPERACIONES_EDITAR, URL_VEHICULOS_EDITAR } from '../../../../Constants/endpoints-API';


const EditarOperaciones = ({onOperacionEditado}) => {
    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleEditarOperaciones = () => {
      Swal.fire({//ventana de alerta
        title: 'Editar Operaciones',
        html: `
          <input id="nombreOperacion" class="swal2-input" value="${registroSeleccionado.nombreOperacion}" />
          
          
          <input id="montoOperacion" class="swal2-input" value="${registroSeleccionado.montoOperacion}" />
          
          <input id="detalleOperacion" class="swal2-input" value="${registroSeleccionado.detalleOperacion}" />
          
          <input id="fechaOperacion" class="swal2-input" value="${registroSeleccionado.fechaOperacion}" />
        
          <br/>
          <br/>
          <label><strong>Selecciona el tipo de operación:</strong></label>
          <br/>
          <select id="tipoOperacion" class="swal2-select">
          <option value="Ingreso" ${registroSeleccionado.tipoOperacion === 'Ingreso' ? 'selected' : ''}>Ingreso</option>
          <option value="Egreso" ${registroSeleccionado.tipoOperacion === 'Egreso' ? 'selected' : ''}>Egreso</option>
        </select>
        <br/>
        
        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
            const nombreOperacion = document.getElementById('nombreOperacion').value;
            const tipoOperacion = document.getElementById('tipoOperacion').value;
            const montoOperacion = document.getElementById('montoOperacion').value;
            const detalleOperacion = document.getElementById('detalleOperacion').value;
            const fechaOperacion = document.getElementById('fechaOperacion').value;
  
            if (!nombreOperacion || !tipoOperacion || !montoOperacion || !detalleOperacion || !fechaOperacion) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
            }
  
          return {
            nombreOperacion,
            tipoOperacion,
            montoOperacion,
            detalleOperacion,
            fechaOperacion

          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`${URL_OPERACIONES_EDITAR}${registroSeleccionado.id_operacion}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'La operacion fue actualizado correctamente.', 'success');
            onOperacionEditado(); 
            clearRegistroSeleccionado(); 
          } catch (error) {
            console.error('Error al actualizar la operacion:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar la operacion.', 'error');
          }
        } else {
          clearRegistroSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (registroSeleccionado) {
        handleEditarOperaciones();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditarOperaciones
