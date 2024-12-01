import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_USUARIOS_CREAR, URL_EMPLEADOS } from '../../../../Constants/endpoints-API';


const CrearUsuarios = ({onUsuarioRegistrado}) => {
    const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
    const token = useAuthStore((state) => state.token);

    const [empleados, setEmpleados] = useState([]);
    // const [obras, setObras] = useState([]);

    const getEmpleados = async () => {
        try {
          const response = await axios.get(URL_EMPLEADOS, { headers: { Authorization: `Bearer ${token}` } });
          setEmpleados(response.data);
        } catch (error) {
          console.error('Error al obtener emoleado:', error);
        }
      };

  
    const handleRegistrarUsuarios = () => {
      Swal.fire({
        title: 'Registrar Viajes',
        html: `
          <input id="nombreUsuario" placeholder="Nombre de usuario" class="swal2-input" />
          <input id="mailUsuario" placeholder="Correo" class="swal2-input" />
          <input id="passwordUsuario" placeholder="Contraseña" class="swal2-input" />
          <br/>
          <br/>
          <label><strong>Selecciona el rol:</strong></label>
          <br/>
          <select id="rol" class="swal2-select">
            <option value="Admin">Admin</option>
            <option value="Empleado">Empleado</option>
          </select>
          <br/>
          <br/>
          <label><strong>Selecciona el empleado:</strong></label>
          <br/>
          <select id="select_empleado" class="swal2-select">
          ${empleados
            .map(
              (empleado) =>
                `<option value="${empleado.id_Empleado}" ${
                  empleado.id === empleado.id_Empleado ? 'selected' : ''
                }>${empleado.id_Empleado}</option>`
            )
            .join('')}
        </select>


        `,
        confirmButtonText: 'Registrar',
        showCancelButton: true,
        preConfirm: () => {
            const nombreUsuario = document.getElementById('nombreUsuario').value;
            const mailUsuario = document.getElementById('mailUsuario').value;
            const passwordUsuario = document.getElementById('passwordUsuario').value;
            const rol = document.getElementById('rol').value;
            const id_Empleado = document.getElementById('select_empleado').value;

            const nombreRegex = /^[a-zA-ZÀ-ÿ\s_]{1,40}$/;
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
            await axios.post(URL_USUARIOS_CREAR, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El usuario fue registrado correctamente.', 'success');
            onUsuarioRegistrado(); 
            closeRegistroModal(); 
          } catch (error) {
            console.error('Error al registrar usuario:', error);
            Swal.fire('Error', 'Hubo un problema al registrar el usuario.', 'error');
          }
        } else {
          closeRegistroModal(); 
        }
      });
    };
  
useEffect(() => {
      if (isRegistroModalOpen) {
        handleRegistrarUsuarios();
      }
      getEmpleados();
    }, [isRegistroModalOpen]);
  
    return null; // No renderiza nada directamente
  };

export default CrearUsuarios