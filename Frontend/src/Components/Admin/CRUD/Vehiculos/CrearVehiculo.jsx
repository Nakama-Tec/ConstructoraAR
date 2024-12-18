import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_VEHICULOS, URL_VEHICULOS_CREAR } from '../../../../Constants/endpoints-API';

const CrearVehiculo = ({ onVehiculoRegistrado }) => {

    const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleRegistrarVehiculo = () => {
      Swal.fire({
        title: 'Registrar Vehículo',
        html: `
          <input id="patenteVehiculo" placeholder="Patente" class="swal2-input" />
          
          <input id="marcaVehiculo" placeholder="Marca" class="swal2-input" />
          
          <input id="seguroVehiculo" placeholder="Seguro" class="swal2-input" />

          <br/>
          <br/>
          <label><strong>Selecciona el tipo de vehiculo:</strong></label>
          <br/>
          <select id="tipoVehiculo" class="swal2-select">
          <option value="Camión">Camión</option>
          <option value="Auto">Auto</option>
          </select>
          <br/>
        `,
        confirmButtonText: 'Registrar',
        showCancelButton: true,
        preConfirm: async () => {
            const patenteVehiculo = document.getElementById('patenteVehiculo').value.trim().replace(/\s+/g, '').toUpperCase();
          const marcaVehiculo = document.getElementById('marcaVehiculo').value;
          const tipoVehiculo = document.getElementById('tipoVehiculo').value;
          const seguroVehiculo = document.getElementById('seguroVehiculo').value;

          // Validaciones
          const patenteRegex = /^[a-zA-Z0-9]+$/;
          const marcaRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
          const seguroRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

          if(!patenteRegex || !marcaRegex.test(marcaVehiculo)){
            Swal.showValidationMessage('La patente no debe contener caracteres especiales.');
            return false;
          }

          if(!marcaVehiculo || !marcaRegex.test(marcaVehiculo)){
            Swal.showValidationMessage('La marca no debe contener números ni caracteres especiales.');
            return false;
          }

          if(!seguroVehiculo || !seguroRegex.test(seguroVehiculo)){
            Swal.showValidationMessage('El seguro no debe contener números ni caracteres especiales.');
            return false;
          }

          try {
            const response = await axios.get(`${URL_VEHICULOS}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const vehiculos = response.data;
            //Verificar si la patente ya se encuentra registrada
            const patenteExistente = vehiculos.some((vehiculo) => vehiculo.patenteVehiculo === patenteVehiculo);
            if (patenteExistente) {
              Swal.showValidationMessage("La patente ya se encuentra registrada.");
              return false;
            }
          } catch (error) {
            Swal.showValidationMessage("Hubo un problema al verificar la patente.");
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
