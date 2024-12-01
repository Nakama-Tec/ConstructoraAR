import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_CLIENTES_EDITAR } from '../../../../Constants/endpoints-API';

const EditarClientes = ({ onClienteEditado }) => {
  const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const handleEditarCliente = () => {
    Swal.fire({
      title: 'Editar Cliente',
      html: `
        <input id="nombreCliente" class="swal2-input" value="${registroSeleccionado.nombreCliente}" />

        <input id="apellidoCliente" class="swal2-input" value="${registroSeleccionado.apellidoCliente}" />
        
        <input id="cuilCliente" class="swal2-input" value="${registroSeleccionado.cuilCliente}" />
        
        <input id="telefonoCliente" class="swal2-input" value="${registroSeleccionado.telefonoCliente}" />

        <input id="mailCliente" class="swal2-input" value="${registroSeleccionado.mailCliente}" />

        <input id="direccionCliente" class="swal2-input" value="${registroSeleccionado.direccionCliente}" />

        <input id="datosGarantes" class="swal2-input" value="${registroSeleccionado.datosGarantes}" />

        <br/>
        <br/>
        <label><strong>Selecciona la condición del cliente:</strong></label>
        <br/>
        <select id="condicionCliente" class="swal2-input">
        <option value="Autonomo" ${registroSeleccionado.condicionCliente === 'Autonomo' ? 'selected' : ''}>Autónomo</option>
        <option value="Privado" ${registroSeleccionado.condicionCliente === 'Privado' ? 'selected' : ''}>Privado</option>
        <option value="Monotributista" ${registroSeleccionado.condicionCliente === 'Monotributista' ? 'selected' : ''}>Monotributista</option>
      </select>
      <br/>
      `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      preConfirm: () => {
        const nombreCliente = document.getElementById('nombreCliente').value;
        const apellidoCliente = document.getElementById('apellidoCliente').value;
        const condicionCliente = document.getElementById('condicionCliente').value;
        const cuilCliente = document.getElementById('cuilCliente').value;
        const telefonoCliente = document.getElementById('telefonoCliente').value;
        const mailCliente = document.getElementById('mailCliente').value;
        const direccionCliente = document.getElementById('direccionCliente').value;
        const datosGarantes = document.getElementById('datosGarantes').value;

        if (!nombreCliente || !apellidoCliente || !condicionCliente || !cuilCliente || !telefonoCliente || !mailCliente || !direccionCliente || !datosGarantes) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        }

        return {
          nombreCliente,
          apellidoCliente,
          condicionCliente,
          cuilCliente,
          telefonoCliente,
          mailCliente,
          direccionCliente,
          datosGarantes
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`${URL_CLIENTES_EDITAR}${registroSeleccionado.id_cliente}`, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'El cliente fue actualizado correctamente.', 'success');
          onClienteEditado(); 
          clearRegistroSeleccionado(); 
        } catch (error) {
          Swal.fire('Error', 'Hubo un problema al actualizar el cliente.', 'error');
        }
      } else {
        clearRegistroSeleccionado(); 
      }
    });
  };

  useEffect(() => {
    if (registroSeleccionado) {
      handleEditarCliente();
    }
  }, [registroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default EditarClientes
