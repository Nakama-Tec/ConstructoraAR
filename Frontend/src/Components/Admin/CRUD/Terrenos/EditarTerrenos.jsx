import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_TERRENOS_EDITAR } from '../../../../Constants/endpoints-API';

const EditarTerrenos = ({ onTerrenoEditado }) => {

    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleEditarTerreno = () => {
      Swal.fire({
        title: 'Editar Terreno',
        html: `
          <label><b>Metros Terreno</b></label> 
          <br>
          <input id="metrosTerrenos" class="swal2-input" type="number" min="0" value="${registroSeleccionado.metrosTerrenos}" />
          <br>
          <br>
          <label><b>Direccion </b></label> 
          <br>
          <input id="direccionTerreno" class="swal2-input" value="${registroSeleccionado.direccionTerreno}" />
            <br>
          <br>
          <label><b>Precio</b></label> 
          <br>
          <input id="precioTerreno" type="number" min="0" class="swal2-input" value="${registroSeleccionado.precioTerreno}" />
          <br/>
          <br/>
          <label><strong>Selecciona la disponibilidad:</strong></label>
          <select id="disponibilidadTerreno" class="swal2-select">
            <option value="1" ${registroSeleccionado.disponibilidadTerreno === 1 ? 'selected' : ''}>Si</option>
            <option value="0" ${registroSeleccionado.disponibilidadTerreno === 0 ? 'selected' : ''}>No</option>
          </select>
          <br>
        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const metrosTerrenos = document.getElementById('metrosTerrenos').value;
          const direccionTerreno = document.getElementById('direccionTerreno').value;
          const precioTerreno = document.getElementById('precioTerreno').value;
          const disponibilidadTerreno = document.getElementById('disponibilidadTerreno').value;

          // Validaciones
          const metrosRegex = /^[a-zA-Z0-9]+$/;
          const direccionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
  
          if (!metrosRegex || !metrosRegex.test(metrosTerrenos)) {
            Swal.showValidationMessage("Los metros no debe contener caracteres especiales.");
            return false;
          }

          if (!direccionTerreno || !direccionRegex.test(direccionTerreno)) {
            Swal.showValidationMessage("La dirección no debe contener caracteres especiales.");
            return false;
          }


          if (!precioTerreno) {
            Swal.showValidationMessage("El precio no debe contener números negativos.");
            return false;
          }
          if (!disponibilidadTerreno) {
            Swal.showValidationMessage("La disponibilidad es incorrecta.");
            return false;
          }
  
          return {
            direccionTerreno,
            metrosTerrenos,
            precioTerreno,
            disponibilidadTerreno
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`${URL_TERRENOS_EDITAR}${registroSeleccionado.id_terreno}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El terreno fue actualizado correctamente.', 'success');
            onTerrenoEditado(); 
            clearRegistroSeleccionado(); 
          } catch (error) {
            console.error('Error al actualizar el terreno:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el terreno.', 'error');
          }
        } else {
          clearRegistroSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (registroSeleccionado) {
        handleEditarTerreno();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditarTerrenos
