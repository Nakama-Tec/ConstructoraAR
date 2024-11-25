import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_EMPLEADOS_CREAR } from '../../../../Constants/endpoints-API';

const CrearEmpleados = ({ onEmpleadoRegistrado }) => {

  const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
  const token = useAuthStore((state) => state.token);


  const handleRegistrarEmpleado = () => {
    Swal.fire({
      title: 'Registrar Empleado',
      html: `
          <input id="nombreEmpleado" placeholder="nombreEmpleado" class="swal2-input" />

          <input id="apellidoEmpleado" placeholder="apellidoEmpleado" class="swal2-input" />

          <input id="dniEmpleado" placeholder="dniEmpleado" class="swal2-input" />

          <input id="direccionEmpleado" placeholder="direccionEmpleado" class="swal2-input" />

          <input id="telefonoEmpleado" placeholder="telefonoEmpleado" class="swal2-input" />
  
      `,
      confirmButtonText: 'Registrar',
      showCancelButton: true,
      preConfirm: () => {
          const nombreEmpleado = document.getElementById('nombreEmpleado').value;
          const apellidoEmpleado = document.getElementById('apellidoEmpleado').value;
          const dniEmpleado = document.getElementById('dniEmpleado').value;
          const direccionEmpleado = document.getElementById('direccionEmpleado').value;
          const telefonoEmpleado = document.getElementById('telefonoEmpleado').value;


        if (!nombreEmpleado || !apellidoEmpleado || !dniEmpleado || !direccionEmpleado || !telefonoEmpleado) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
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
          await axios.post(URL_EMPLEADOS_CREAR, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'El empleado fue registrado correctamente.', 'success');
          onClienteRegistrado(); 
          closeRegistroModal(); 
        } catch (error) {
          Swal.fire('Error', 'Hubo un problema al registrar al empleado.', 'error');
        }
      } else {
        closeRegistroModal(); 
      }
    });
  };

useEffect(() => {
    if (isRegistroModalOpen) {
      handleRegistrarEmpleado();
    }
  }, [isRegistroModalOpen]);

  return null; // No renderiza nada directamente
};

export default CrearEmpleados
