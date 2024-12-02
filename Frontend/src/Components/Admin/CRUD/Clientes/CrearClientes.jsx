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
            <input id="cuilCliente" placeholder="Cuil" class="swal2-input" 
                   type="text" maxlength="11" pattern="\\d{10,11}" 
                   title="El CUIL debe tener entre 10 y 11 dígitos" />
            <input id="telefonoCliente" placeholder="Teléfono" class="swal2-input" 
                   type="text" maxlength="10" pattern="\\d{10}" 
                   title="El teléfono debe tener exactamente 10 dígitos" />
            <input id="mailCliente" placeholder="Mail" class="swal2-input" />
            <input id="direccionCliente" placeholder="Dirección" class="swal2-input" />
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
    
          // Validar campos obligatorios
          if (
            !nombreCliente || !apellidoCliente || !condicionCliente || !cuilCliente ||
            !telefonoCliente || !mailCliente || !direccionCliente || !datosGarantes
          ) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          }
    
          // Validar longitud de CUIL
          if (cuilCliente.length < 10 || cuilCliente.length > 11 || isNaN(cuilCliente)) {
            Swal.showValidationMessage('El CUIL debe tener entre 10 y 11 dígitos numéricos');
          }
    
          // Validar longitud de Teléfono
          if (telefonoCliente.length !== 10 || isNaN(telefonoCliente)) {
            Swal.showValidationMessage('El Teléfono debe tener exactamente 10 dígitos numéricos');
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
