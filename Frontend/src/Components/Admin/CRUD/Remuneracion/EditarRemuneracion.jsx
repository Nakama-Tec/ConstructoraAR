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
        title: 'Editar Remuneración',
        html: `
            <label><b>Detalle</b></label> 
            <br>
            <input id="detalle" class="swal2-input" value="${registroSeleccionado.detalle}" />
            <br>
            <br>
            <label><b>Monto Remuneracion</b></label> 
            <br>
            <input id="montoRemuneracion" class="swal2-input" type="number" min="0" value="${registroSeleccionado.montoRemuneracion}" />
            <br>
            <br>
            <label><b>Cantidad Empleados</b></label> 
            <br>
            <input id="cantEmpleado" class="swal2-input" type="number" min="0" value="${registroSeleccionado.cantEmpleado}" />
            <br>
            <br>
            <label><b>Tipo Empleado</b></label> 
            <br>
            <select id="tipoEmpleado" class="swal2-select">
              <option value="0" ${registroSeleccionado.tipoEmpleado === 0 ? 'selected' : ''}>Admin</option>
              <option value="1" ${registroSeleccionado.tipoEmpleado === 1 ? 'selected' : ''}>Obrero</option>
            </select>
            <br>
            <br>
            <label><b>Sector</b></label> 
            <br>
            <select id="sectorRemuneracion" class="swal2-select">
              <option value="0" ${registroSeleccionado.sectorRemuneracion === 0 ? 'selected' : ''}>Publico</option>
              <option value="1" ${registroSeleccionado.sectorRemuneracion === 1 ? 'selected' : ''}>Privado</option>
            </select>
            <br>
            <br>
            <label><b>Fecha Remuneracion</b></label> 
            <br>
            <input id="fechaRemuneracion" placeholder="Fecha" class="swal2-input" type="date" value='${registroSeleccionado.fechaRemuneracion}' />

  
  
          
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
      
          // Validaciones
        
         const detallesRegex = /^[^@]+$/;
     
         if (!detalle || !detallesRegex.test(detalle)) {
           Swal.showValidationMessage("El detalle no debe contener caracteres especiales.");
           return false;
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