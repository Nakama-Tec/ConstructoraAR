import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_VIAJES_EDITAR, URL_VEHICULOS, URL_OBRAS } from '../../../../Constants/endpoints-API';


const EditarViaje = ({ onViajeEditado }) => {

    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
    const [vehiculos, setVehiculos] = useState([]);
    const [obras, setObras] = useState([]);

    const getVehiculos = async () => {
        try {
          const response = await axios.get(URL_VEHICULOS, { headers: { Authorization: `Bearer ${token}` } });
          console.log(response.data)
          setVehiculos(response.data);
        } catch (error) {
          console.error('Error al obtener vehículos:', error);
        }
      };

      const getObra = async () => {
        try {
          const response = await axios.get(URL_OBRAS, { headers: { Authorization: `Bearer ${token}` } });
          console.log(response.data)
          setObras(response.data);
        } catch (error) {
          console.error('Error al obtener la obra:', error);
        }
      };

      
  
    const handleEditarViaje = () => {
      Swal.fire({
        title: 'Editar Viaje',
        html: `
          <input id="fechaViaje" class="swal2-input" value="${registroSeleccionado.fechaViaje}" />
          
          <select id="select_vehiculo" class="swal2-select">
          ${vehiculos
            .map(
              (vehiculo) =>
                `<option value="${vehiculo.id_vehiculo}" ${
                  vehiculo.id === registroSeleccionado.id_vehiculo ? 'selected' : ''
                }>${vehiculo.patenteVehiculo}</option>`
            )
            .join('')}
        </select>


        <select id="select_obra" class="swal2-select">
          ${obras
            .map(
              (obra) =>
                `<option value="${obra.id_obra}" ${
                  obra.id === registroSeleccionado.id_obra ? 'selected' : ''
                }>${obra.nombreObra}</option>`
            )
            .join('')}
        </select>
          
        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const fechaViaje = document.getElementById('fechaViaje').value;
          const id_vehiculo = document.getElementById('select_vehiculo').value;
          const id_obra = document.getElementById('select_obra').value;
          
  
          if (!fechaViaje || !id_vehiculo || !id_obra) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          }
  
          return {
            fechaViaje,
            id_vehiculo,
            id_obra,
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`${URL_VIAJES_EDITAR}${registroSeleccionado.id_viaje}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El viaje fue actualizado correctamente.', 'success');
            onViajeEditado(); 
            clearRegistroSeleccionado(); 
          } catch (error) {
            console.error('Error al actualizar viaje:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el viaje.', 'error');
          }
        } else {
          clearRegistroSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (registroSeleccionado) {
        handleEditarViaje();
      }
      getVehiculos();
        getObra();
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditarViaje
