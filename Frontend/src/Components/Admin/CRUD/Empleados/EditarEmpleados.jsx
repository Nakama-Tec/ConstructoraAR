import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_EMPLEADOS_EDITAR } from '../../../../Constants/endpoints-API';

const EditarEmpleados = ({ onEmpleadoEditado }) => {

    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);

    const handleEditarEmpleado = () => {
      Swal.fire({
        title: 'Editar Empleado',
        html: `
            <label><b>Nombre Empleado</b></label> 
            <br>
            <input id="nombreEmpleado" class="swal2-input" value="${registroSeleccionado.nombreEmpleado}" />
             <br>
             <br>
             <label><b>Apellido Empleado</b></label> 
             <br>
            <input id="apellidoEmpleado" class="swal2-input" value="${registroSeleccionado.apellidoEmpleado}" />
            <br>
             <br>
             <label><b>DNI</b></label> 
             <br>
            <input id="dniEmpleado" class="swal2-input" value="${registroSeleccionado.dniEmpleado}" />
            <br>
             <br>
             <label><b>Direccion</b></label> 
             <br>
            <input id="direccionEmpleado" class="swal2-input" value="${registroSeleccionado.direccionEmpleado}" />
            <br>
             <br>
             <label><b>Telefono</b></label> 
             <br>
            <input id="telefonoEmpleado" class="swal2-input" value="${registroSeleccionado.telefonoEmpleado}" />

        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const nombreEmpleado = document.getElementById('nombreEmpleado').value;
            const apellidoEmpleado = document.getElementById('apellidoEmpleado').value;
            const dniEmpleado = document.getElementById('dniEmpleado').value;
            const direccionEmpleado = document.getElementById('direccionEmpleado').value;
            const telefonoEmpleado = document.getElementById('telefonoEmpleado').value;

            // Validaciones
            const nombreRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
            const apellidoRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
            const dniRegex = /^\d{7,8}$/;
            const telefonoRegex = /^\d{10}$/;
            const direccionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
  
            if (!nombreEmpleado || !nombreRegex.test(nombreEmpleado)) {
              Swal.showValidationMessage("El nombre no debe contener números.");
              return false;
            }
            if (!apellidoEmpleado || !apellidoRegex.test(apellidoEmpleado)) {
              Swal.showValidationMessage("El apellido no debe contener números.");
              return false;
            }
            if (!dniRegex || !dniRegex.test(dniEmpleado)) {
              Swal.showValidationMessage("El DNI debe contener entre 7 y 8 dígitos.");
              return false;
            }
  
            if (!direccionEmpleado || !direccionRegex.test(direccionEmpleado)) {
              Swal.showValidationMessage("La dirección no debe contener caracteres especiales.");
              return false;
            }
  
            if (!telefonoEmpleado || !telefonoRegex.test(telefonoEmpleado)) {
              Swal.showValidationMessage("El teléfono debe contener solo 10 dígitos.");
              return false;
            }

          return {
            nombreEmpleado,
            apellidoEmpleado,
            dniEmpleado,
            direccionEmpleado,
            telefonoEmpleado,
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`${URL_EMPLEADOS_EDITAR}${registroSeleccionado.id_Empleado}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El empleado fue actualizado correctamente.', 'success');
            onEmpleadoEditado(); 
            clearRegistroSeleccionado(); 
          } catch (error) {
            Swal.fire('Error', 'Hubo un problema al actualizar al empleado.', 'error');
          }
        } else {
          clearRegistroSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (registroSeleccionado) {
        handleEditarEmpleado();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditarEmpleados
