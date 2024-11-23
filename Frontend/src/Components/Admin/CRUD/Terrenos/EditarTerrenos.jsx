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
          <input id="metrosTerrenos" class="swal2-input" value="${registroSeleccionado.metrosTerrenos}" />
          
          <input id="direccionTerreno" class="swal2-input" value="${registroSeleccionado.direccionTerreno}" />
          
          <input id="precioTerreno" class="swal2-input" value="${registroSeleccionado.precioTerreno}" />
          
          <input id="disponibilidadTerreno" class="swal2-input" value="${registroSeleccionado.disponibilidadTerreno}" />
        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const metrosTerrenos = document.getElementById('metrosTerrenos').value;
          const direccionTerreno = document.getElementById('direccionTerreno').value;
          const precioTerreno = document.getElementById('precioTerreno').value;
          const disponibilidadTerreno = document.getElementById('disponibilidadTerreno').value;
  
          if (!metrosTerrenos || !direccionTerreno || !precioTerreno || !disponibilidadTerreno) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
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
