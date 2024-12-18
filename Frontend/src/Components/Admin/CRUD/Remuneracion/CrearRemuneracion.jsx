import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_REMUNERACIONES_CREAR } from '../../../../Constants/endpoints-API';


const CrearRemuneracion = ({onRemuneracionRegistrada}) => {
    const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
    const token = useAuthStore((state) => state.token);

    const handleRegistrarRemuneracion = () => {
      Swal.fire({
        title: 'Registrar Remuneracion',
        html: `
                    <input id="detalle" placeholder="Detalle" class="swal2-input" />
                    <input id="montoRemuneracion" placeholder="Monto Remuneracion" type="number" min="0" class="swal2-input" />
                    <input id="cantEmpleado" placeholder="Cantidad de Empleados" type="number" min="0" class="swal2-input" />
                    <br>
                    <br>
                    <label><b>Empleado</b></label> 
                    <br>
                    <select id="tipoEmpleado" class="swal2-select">
                        <option value="0">Administrativo</option>
                        <option value="1">Obrero</option>
                        </select>        
                    <br>
                    <br>
                    <label><b>Sector</b></label> 
                    <br>            
                    <select id="sectorRemuneracion" class="swal2-select">
                        <option value="0">Publico</option>
                        <option value="1">Privado</option>
                        </select>
                        <br>
                    <br>
                    <label><b>Fecha Remuneracion</b></label> 
                    <br>
                    <input id="fechaRemuneracion" placeholder="Fecha" class="swal2-input" type="date"/>

       

        `,
        confirmButtonText: 'Registrar',
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
            await axios.post(URL_REMUNERACIONES_CREAR, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'La remuneracion fue registrado correctamente.', 'success');
            onRemuneracionRegistrada(); 
            closeRegistroModal(); 
          } catch (error) {
            console.error('Error al registrar la remuneracion:', error);
            Swal.fire('Error', 'Hubo un problema al registrar la remuneracion.', 'error');
          }
        } else {
          closeRegistroModal(); 
        }
      });
    };
  
useEffect(() => {
      if (isRegistroModalOpen) {
        handleRegistrarRemuneracion();
      }
      ;
        
    }, [isRegistroModalOpen]);
  
    return null; // No renderiza nada directamente
  };

export default CrearRemuneracion