import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_PENDIENTES_CREAR } from '../../../../Constants/endpoints-API';

const CrearPendiente = ({ onPendienteRegistrado }) => {

  const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const handleRegistrarPendiente = () => {
    Swal.fire({
      title: 'Registrar Pendiente',
      html: `
        <input id="Descripcion" placeholder="Descripción" class="swal2-input" />
       <br>
       <br>
       <label><b>Fecha Creacion</b></label> 
       <br>
      <input id="fechaCreacion" placeholder="Fecha Creación" type="date" class="swal2-input" />
       <br>
       <br>
       <label><b>Fecha Limite</b></label> 
       <br>
      <input id="fechaLimite" placeholder="Fecha Límite" type="date" class="swal2-input" />
       <br/>
       <br/>
       <label><strong>Selecciona el estado:</strong></label>
      <select id="estado" class="swal2-select">
        <option value="Pendiente">Pendiente</option>
        <option value="En Progreso">En Progreso</option>
        <option value="Completado">Completado</option>
      </select>
       <br/>
       <br/>
      <label><strong>Selecciona la prioridad:</strong></label>
      <select id="prioridad" class="swal2-select">
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
      </select>
      <br/>
      `,
      confirmButtonText: 'Registrar',
      showCancelButton: true,
      preConfirm: () => {
        const Descripcion = document.getElementById('Descripcion').value;
        const fechaCreacion = document.getElementById('fechaCreacion').value;
        const fechaLimite = document.getElementById('fechaLimite').value;
        const estado = document.getElementById('estado').value;
        const prioridad = document.getElementById('prioridad').value;

        if (!Descripcion || !fechaCreacion || !fechaLimite || !estado || !prioridad) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        }

        return {
          Descripcion,
          estado,
          fechaCreacion,
          fechaLimite,
          prioridad
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(URL_PENDIENTES_CREAR, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'El pendiente fue registrado correctamente.', 'success');
          onPendienteRegistrado(); 
          closeRegistroModal(); 
        } catch (error) {
          console.error('Error al registrar pendiente:', error);
          Swal.fire('Error', 'Hubo un problema al registrar el pendiente.', 'error');
        }
      } else {
        closeRegistroModal(); 
      }
    });
  };

useEffect(() => {
    if (isRegistroModalOpen) {
      handleRegistrarPendiente();
    }
  }, [isRegistroModalOpen]);

  return null; // No renderiza nada directamente
};

export default CrearPendiente
