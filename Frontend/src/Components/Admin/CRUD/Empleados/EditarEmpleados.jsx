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
          <input id="nombreEmpleado" class="swal2-input" value="${registroSeleccionado.nombreEmpleado}" />

            <input id="apellidoEmpleado" class="swal2-input" value="${registroSeleccionado.apellidoEmpleado}" />

            <input id="dniEmpleado" class="swal2-input" value="${registroSeleccionado.dniEmpleado}" />

            <input id="direccionEmpleado" class="swal2-input" value="${registroSeleccionado.direccionEmpleado}" />

            <input id="telefonoEmpleado" class="swal2-input" value="${registroSeleccionado.telefonoEmpleado}" />

            <input id="emailEmpleado" class="swal2-input" value="${registroSeleccionado.emailEmpleado}" />

        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const nombreEmpleado = document.getElementById('nombreEmpleado').value;
            const apellidoEmpleado = document.getElementById('apellidoEmpleado').value;
            const dniEmpleado = document.getElementById('dniEmpleado').value;
            const direccionEmpleado = document.getElementById('direccionEmpleado').value;
            const telefonoEmpleado = document.getElementById('telefonoEmpleado').value;
            const emailEmpleado = document.getElementById('emailEmpleado').value;
  
          if (!nombreEmpleado || !apellidoEmpleado || !dniEmpleado || !direccionEmpleado || !telefonoEmpleado || !emailEmpleado) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          }
  
          return {
            nombreEmpleado,
            apellidoEmpleado,
            dniEmpleado,
            direccionEmpleado,
            telefonoEmpleado,
            emailEmpleado
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`${URL_EMPLEADOS_EDITAR}${registroSeleccionado.id_Empleado}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El empleado fue actualizado correctamente.', 'success');
            handleEditarEmpleado(); 
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
