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
  // const [obras, setObras] = useState([]);

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
          <input id="nombreUsuario" class="swal2-input" value="${registroSeleccionado.nombreUsuario}" />
          <input id="mailUsuario" class="swal2-input" value="${registroSeleccionado.mailUsuario}" />
          <input id="passwordUsuario" class="swal2-input" value="${registroSeleccionado.passwordUsuario}" />
          <select id="rol" class="swal2-select">
            <option value="Admin" ${registroSeleccionado.rol === 'Admin' ? 'selected' : ''}>Admin</option>
            <option value="Empleado" ${registroSeleccionado.rol === 'Empleado' ? 'selected' : ''}>Empleado</option>
          </select>

        <select id="select_vehiculo" class="swal2-select">
        ${empleados
          .map(
            (empleado) =>
              `<option value="${empleado.id_Empleado}" ${
                empleado.id_Empleado === registroSeleccionado.id_Empleado ? 'selected' : ''
              }>${empleado.id_Empleado}</option>`
          )
          .join('')}
      </select>

        
      `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      preConfirm: () => {
        const nombreUsuario = Swal.getPopup().querySelector('#nombreUsuario').value;
        const mailUsuario = Swal.getPopup().querySelector('#mailUsuario').value;
        const passwordUsuario = Swal.getPopup().querySelector('#passwordUsuario').value;
        const rol = Swal.getPopup().querySelector('#rol').value;
        const id_Empleado = Swal.getPopup().querySelector('#select_vehiculo').value;
        

        if (!nombreUsuario || !mailUsuario || !passwordUsuario || !rol || !id_Empleado) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
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