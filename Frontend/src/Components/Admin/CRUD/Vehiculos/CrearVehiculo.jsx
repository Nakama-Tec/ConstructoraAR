import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useVehiculoStore from '../../../../Context/useVehiculoStore';
import { URL_VEHICULOS_CREAR } from '../../../../Constants/endpoints-API';

const CrearVehiculo = ({ onVehiculoRegistrado }) => {

    const { isRegistroModalOpen, closeRegistroModal } = useVehiculoStore();
    const token = useAuthStore((state) => state.token);
  
    const handleRegistrarVehiculo = () => {
      Swal.fire({
        title: 'Registrar Vehículo',
        html: `
          <input id="patenteVehiculo" placeholder="Patente" class="swal2-input" />
          
          <input id="marcaVehiculo" placeholder="Marca" class="swal2-input" />
          
          <input id="tipoVehiculo" placeholder="Tipo Vehiculo" class="swal2-input" />
          
          <input id="seguroVehiculo" placeholder="Seguro" class="swal2-input" />
        `,
        confirmButtonText: 'Registrar',
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
            await axios.post(URL_VEHICULOS_CREAR, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El vehículo fue registrado correctamente.', 'success');
            onVehiculoRegistrado(); 
            closeRegistroModal(); 
          } catch (error) {
            console.error('Error al registrar vehículo:', error);
            Swal.fire('Error', 'Hubo un problema al registrar el vehículo.', 'error');
          }
        } else {
          closeRegistroModal(); 
        }
      });
    };
  
useEffect(() => {
      if (isRegistroModalOpen) {
        handleRegistrarVehiculo();
      }
    }, [isRegistroModalOpen]);
  
    return null; // No renderiza nada directamente
  };

export default CrearVehiculo
