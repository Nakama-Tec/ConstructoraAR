import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_CLIENTES_CREAR } from '../../../../Constants/endpoints-API';

const CrearClientes = ({ onClienteRegistrado }) => {

    const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleRegistrarCliente = () => {
      Swal.fire({
        title: 'Registrar Cliente',
        html: `
            <input id="nombreCliente" placeholder="Nombre" class="swal2-input" />

            <input id="apellidoCliente" placeholder="Apellido" class="swal2-input" />

            <input id="condicionCliente" placeholder="Condicion" class="swal2-input" />

            <input id="cuilCliente" placeholder="Cuil" class="swal2-input" />

            <input id="telefonoCliente" placeholder="Telefono" class="swal2-input" />

            <input id="mailCliente" placeholder="Mail" class="swal2-input" />

            <input id="direccionCliente" placeholder="Direccion" class="swal2-input" />

            <input id="datosGarantes" placeholder="Datos Garantes" class="swal2-input" />
    
        `,
        confirmButtonText: 'Registrar',
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
            await axios.post(URL_CLIENTES_CREAR, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El cliente fue registrado correctamente.', 'success');
            onClienteRegistrado(); 
            closeRegistroModal(); 
          } catch (error) {
            Swal.fire('Error', 'Hubo un problema al registrar el cliente.', 'error');
          }
        } else {
          closeRegistroModal(); 
        }
      });
    };
  
useEffect(() => {
      if (isRegistroModalOpen) {
        handleRegistrarCliente();
      }
    }, [isRegistroModalOpen]);
  
    return null; // No renderiza nada directamente
  };

export default CrearClientes
