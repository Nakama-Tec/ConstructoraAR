import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../../Context/useAuthStore';
import useRegistroStore from '../../../../../Context/useRegistroStore';
import { URL_DEPARTAMENTOS_EDITAR } from '../../../../../Constants/endpoints-API';

const EditarDepto = ({ onDeptoEditado }) => {
    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleEditarDepto = () => {
      Swal.fire({
        title: 'Editar Departamento',
        html: `
          <input id="nombreDepartamento" class="swal2-input" value="${registroSeleccionado.nombreDepartamento}" />
          
          <input id="direccionDepartamento" class="swal2-input" value="${registroSeleccionado.direccionDepartamento}" />
          
          <input id="descripcionDepartamento" class="swal2-input" value="${registroSeleccionado.descripcionDepartamento}" />
          
          <input id="precioDepartamento" class="swal2-input" value="${registroSeleccionado.precioDepartamento}" />

          <input id="precioExpensa" class="swal2-input" value="${registroSeleccionado.precioExpensa}" />

          <input id="serviciosIncluidos" class="swal2-input" value="${registroSeleccionado.serviciosIncluidos}" />

          <input id="contratoDescripcion" class="swal2-input" value="${registroSeleccionado.contratoDescripcion}" />

          <input id="disponibilidadDepartamento" class="swal2-input" value="${registroSeleccionado.disponibilidadDepartamento}" />
        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const nombreDepartamento = document.getElementById('nombreDepartamento').value;
          const direccionDepartamento = document.getElementById('direccionDepartamento').value;
          const descripcionDepartamento = document.getElementById('descripcionDepartamento').value;
          const precioDepartamento = document.getElementById('precioDepartamento').value;
          const precioExpensa = document.getElementById('precioExpensa').value;
          const serviciosIncluidos = document.getElementById('serviciosIncluidos').value;
          const contratoDescripcion = document.getElementById('contratoDescripcion').value;
          const disponibilidadDepartamento = document.getElementById('disponibilidadDepartamento').value;
  
          if (!nombreDepartamento || !direccionDepartamento || !descripcionDepartamento || !precioDepartamento || !precioExpensa || !serviciosIncluidos || !contratoDescripcion || !disponibilidadDepartamento) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          }
  
          return {
            nombreDepartamento,
            direccionDepartamento,
            descripcionDepartamento,
            precioDepartamento,
            precioExpensa,
            serviciosIncluidos,
            contratoDescripcion,
            disponibilidadDepartamento
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`${URL_DEPARTAMENTOS_EDITAR}${registroSeleccionado.id_departamento}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El departamento fue actualizado correctamente.', 'success');
            onDeptoEditado(); 
            clearRegistroSeleccionado(); 
          } catch (error) {
            console.error('Error al actualizar departamento:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el departamento.', 'error');
          }
        } else {
          clearRegistroSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (registroSeleccionado) {
        handleEditarDepto();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditarDepto
