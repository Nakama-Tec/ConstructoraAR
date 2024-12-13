import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_USUARIOS_EDITAR, URL_EMPLEADOS } from '../../../../Constants/endpoints-API';



const EditarUsuarios = ({onUsuarioEditado}) => {

  const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
  const token = useAuthStore((state) => state.token);
  const [empleados, setEmpleados] = useState([]);

  const getEmpleados = async () => {
      try {
        const response = await axios.get(URL_EMPLEADOS, { headers: { Authorization: `Bearer ${token}` } });
        setEmpleados(response.data);
      } catch (error) {
        console.error('Error al obtener vehículos:', error);
      }
    };

  const handleEditarUsuarios = () => {
    Swal.fire({
      title: 'Editar Usuario',
      html: `
          <label><b>Nombre Usuario</b></label> 
          <br>
          <input id="nombreUsuario" class="swal2-input" value="${registroSeleccionado.nombreUsuario}" />
          <br>
          <br>
          <label><b>Mail Usuario</b></label> 
          <br>
          <input id="mailUsuario" class="swal2-input" value="${registroSeleccionado.mailUsuario}" />
          <br>
          <br>
          <label><b>Contraseña</b></label> 
          <br>
          <input id="passwordUsuario" class="swal2-input" value="${registroSeleccionado.passwordUsuario}" />
          <br/>
          <br/>
          <label><strong>Selecciona el rol:</strong></label>
          <br/>
          <select id="rol" class="swal2-select">
            <option value="Admin" ${registroSeleccionado.rol.toLowerCase() === 'admin' ? 'selected' : ''}>Admin</option>
            <option value="Empleado" ${registroSeleccionado.rol.toLowerCase() === 'empleado' ? 'selected' : ''}>Empleado</option>

          </select>
          
          <br/>
          <br/>
          <label><strong>Selecciona el empleado:</strong></label>
          <br/>
        <select id="select_vehiculo" class="swal2-select">
        ${empleados
          .map(
            (empleado) =>
              `<option value="${empleado.id_Empleado}" ${
                empleado.id_Empleado === registroSeleccionado.id_Empleado ? 'selected' : ''
              }>${empleado.nombreEmpleado} ${empleado.apellidoEmpleado}</option>`
          )
          .join('')}
      </select>

        
      `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      preConfirm: () => {
        const nombreUsuario = Swal.getPopup().querySelector('#nombreUsuario').value.trim();
        const mailUsuario = Swal.getPopup().querySelector('#mailUsuario').value;
        const passwordUsuario = Swal.getPopup().querySelector('#passwordUsuario').value.trim();
        const rol = Swal.getPopup().querySelector('#rol').value;
        const id_Empleado = Swal.getPopup().querySelector('#select_vehiculo').value;
        
        const nombreRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
        const mailRegex = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        if (!nombreRegex || !nombreRegex.test(nombreUsuario)) {
          Swal.showValidationMessage("El nombre de usuario no debe contener caracteres especiales.");
          return false;
        }

        if (!mailUsuario || !mailRegex.test(mailUsuario)) {
          Swal.showValidationMessage("El mail no es válido.");
          return false;
        }

        if (!passwordUsuario || !passwordRegex.test(passwordUsuario)) {
          Swal.showValidationMessage("La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
          return false;
        }

        return {
          nombreUsuario,
          mailUsuario,
          passwordUsuario,
          rol,
          id_Empleado
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`${URL_USUARIOS_EDITAR}${registroSeleccionado.id_usuario}`, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'El usuario fue actualizado correctamente.', 'success');
          onUsuarioEditado(); 
          clearRegistroSeleccionado(); 
        } catch (error) {
          console.error('Error al actualizar usuario:', error);
          Swal.fire('Error', 'Hubo un problema al actualizar el usuario.', 'error');
        }
      } else {
        clearRegistroSeleccionado(); 
      }
    });
  };

  useEffect(() => {
    if (registroSeleccionado) {
      handleEditarUsuarios();
    }
    getEmpleados();
  }, [registroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default EditarUsuarios