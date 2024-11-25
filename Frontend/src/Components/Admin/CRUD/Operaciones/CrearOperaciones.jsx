import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_OPERACIONES_CREAR } from '../../../../Constants/endpoints-API';

const CrearOperaciones = ({onOperacionRegistrado}) => {
    const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleRegistrarOperaciones = () => {
      Swal.fire({
        title: 'Registrar Operaciones',
        html: `
          <input id="nombreOperacion" placeholder="Nombre Operaciones" class="swal2-input" />
          
          <input id="tipoOperacion" placeholder="Tipo Operacion" class="swal2-input" />
          
          <input id="montoOperacion" type ="number" placeholder="Monto Operacion" class="swal2-input" />
          
          <input id="detalleOperacion" placeholder="Detalle de la Operacion" class="swal2-input" />

          <input id="fechaOperacion" placeholder="Fecha de la Operacion" class="swal2-input" />
        `,
        confirmButtonText: 'Registrar',//nombre del boton de confirmacion
        showCancelButton: true,//para que aparezca el boton de cancelar
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
        if (result.isConfirmed) {//si se confirma la accion de registrar
          try {
            await axios.post(URL_OPERACIONES_CREAR, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'La Operacion fue registrada correctamente.', 'success');
            onOperacionRegistrado(); 
            closeRegistroModal(); 
          } catch (error) {
            console.error('Error al registrar la Operacion:', error);
            Swal.fire('Error', 'Hubo un problema al registrar la operacion.', 'error');
          }
        } else {
          closeRegistroModal(); 
        }
      });
    };
  
useEffect(() => {
      if (isRegistroModalOpen) {
        handleRegistrarOperaciones();
      }
    }, [isRegistroModalOpen]);
  
    return null; // No renderiza nada directamente
  };

export default CrearOperaciones
