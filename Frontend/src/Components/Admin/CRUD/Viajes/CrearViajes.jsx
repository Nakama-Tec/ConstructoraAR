import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_VIAJES_CREAR, URL_VEHICULOS, URL_OBRAS } from '../../../../Constants/endpoints-API';



const CrearViajes = ({onViajeRegistrado}) => {
    const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
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
  
    const handleRegistrarViajes = () => {
      Swal.fire({
        title: 'Registrar Viajes',
        html: `
          <input id="fechaViaje" class="swal2-input" placeholder="Fecha" type="date"/>
          
          <select id="select_vehiculo" class="swal2-select">
          ${vehiculos
            .map(
              (vehiculo) =>
                `<option value="${vehiculo.id_vehiculo}" ${
                  vehiculo.id === vehiculo.id_vehiculo ? 'selected' : ''
                }>${vehiculo.patenteVehiculo}</option>`
            )
            .join('')}
        </select>

          <select id="select_obra" class="swal2-select">
          ${obras
            .map(
              (obra) =>
                `<option value="${obra.id_obra}" ${
                  obra.id === obra.id_obra ? 'selected' : ''
                }>${obra.nombreObra}</option>`
            )
            .join('')}
        </select>

        `,
        confirmButtonText: 'Registrar',
        showCancelButton: true,
        preConfirm: () => {
          const fechaViaje = document.getElementById('fechaViaje').value;
          const id_vehiculo = document.getElementById('select_vehiculo').value;
          const id_obra = document.getElementById('select_obra').value;
  
          if (!fechaViaje || !id_vehiculo || !id_obra ) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          }
  
          return {
            fechaViaje,
            id_vehiculo,
            id_obra
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post(URL_VIAJES_CREAR, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El viaje fue registrado correctamente.', 'success');
            onViajeRegistrado(); 
            closeRegistroModal(); 
          } catch (error) {
            console.error('Error al registrar viaje:', error);
            Swal.fire('Error', 'Hubo un problema al registrar el viaje.', 'error');
          }
        } else {
          closeRegistroModal(); 
        }
      });
    };
  
useEffect(() => {
      if (isRegistroModalOpen) {
        handleRegistrarViajes();
      }
      getVehiculos();
        getObra();
    }, [isRegistroModalOpen]);
  
    return null; // No renderiza nada directamente
  };

export default CrearViajes