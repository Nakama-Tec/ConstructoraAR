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
          <input id="nombreEmpleado" placeholder="Nombre Empleado" class="swal2-input" />

          <input id="apellidoEmpleado" placeholder="Apellido Empleado" class="swal2-input" />

          <input id="dniEmpleado" placeholder="DNI Empleado" class="swal2-input" />

          <input id="direccionEmpleado" placeholder="Direccion Empleado" class="swal2-input" />

          <input id="telefonoEmpleado" placeholder="Telefono Empleado" class="swal2-input" />
  
      `,
      confirmButtonText: 'Registrar',
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
          await axios.post(URL_EMPLEADOS_CREAR, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'El empleado fue registrado correctamente.', 'success');
          onEmpleadoRegistrado();
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
