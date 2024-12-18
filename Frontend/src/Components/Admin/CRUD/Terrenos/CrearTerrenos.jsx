import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_TERRENOS_CREAR } from '../../../../Constants/endpoints-API';

const CrearTerrenos = ({ onTerrenoRegistrado }) => {

    const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleRegistrarTerreno = () => {
      Swal.fire({
        title: 'Registrar Terreno',
        html: `
          <input id="metrosTerrenos" placeholder="Metros Cuadrados" type="number" min="0" class="swal2-input" />
          
          <input id="direccionTerreno" placeholder="Dirección" class="swal2-input" />
          
          <input id="precioTerreno" type="number" min="0" placeholder="Precio" class="swal2-input" />
          
            <br/>
            <br/>
            <label><strong>Selecciona la disponibilidad:</strong></label>
            <br/>
            <select id="disponibilidadTerreno" class="swal2-select">
            <option value="1">Si</option>
            <option value="0">No</option>
          </select>
          <br/>
        `,
        confirmButtonText: 'Registrar',
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
            metrosTerrenos,
            direccionTerreno,
            precioTerreno,
            disponibilidadTerreno
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post(URL_TERRENOS_CREAR, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El terreno fue registrado correctamente.', 'success');
            onTerrenoRegistrado(); 
            closeRegistroModal(); 
          } catch (error) {
            console.error('Error al registrar el terreno:', error);
            Swal.fire('Error', 'Hubo un problema al registrar el terreno.', 'error');
          }
        } else {
          closeRegistroModal(); 
        }
      });
    };
  
useEffect(() => {
      if (isRegistroModalOpen) {
        handleRegistrarTerreno();
      }
    }, [isRegistroModalOpen]);
  
    return null; // No renderiza nada directamente
  };

export default CrearTerrenos
