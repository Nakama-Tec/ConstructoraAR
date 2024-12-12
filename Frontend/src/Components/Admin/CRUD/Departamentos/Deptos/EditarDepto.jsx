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
            <label><strong>Nombre Departamento:</strong></label>
            <br/>
          <input id="nombreDepartamento" class="swal2-input" value="${registroSeleccionado.nombreDepartamento}" />
          <br/>
          <br/>
          <label><strong>Direccion:</strong></label>
          <br/>
          <input id="direccionDepartamento" class="swal2-input" value="${registroSeleccionado.direccionDepartamento}" />
          <br/>
          <br/>
          <label><strong>Descripcion:</strong></label>
          <br/>
          <input id="descripcionDepartamento" class="swal2-input" value="${registroSeleccionado.descripcionDepartamento}" />
          <br/>
          <br/>
          <label><strong>Precio Departamento:</strong></label>
          <br/>
          <input id="precioDepartamento" class="swal2-input" value="${registroSeleccionado.precioDepartamento}" />
          <br/>
          <br/>
          <label><strong>Precio Expensa:</strong></label>
          <br/>
          <input id="precioExpensa" class="swal2-input" value="${registroSeleccionado.precioExpensa}" />
          <br/>
          <br/>
          <label><strong>Servicios Incluidos:</strong></label>
          <br/>
          <select id="serviciosIncluidos" class="swal2-select">
            <option value="1" ${registroSeleccionado.serviciosIncluidos === 1 ? 'selected' : ''}>Si</option>
            <option value="0" ${registroSeleccionado.serviciosIncluidos === 0 ? 'selected' : ''}>No</option>
          </select>
          <br/>
          <br/>
          <label><strong>Descripcion Contrato:</strong></label>
          <br/>
          <input id="contratoDescripcion" class="swal2-input" value="${registroSeleccionado.contratoDescripcion}" />
          <br/>
          <br/>
          <label><strong>Selecciona la disponibilidad:</strong></label>
          <select id="disponibilidadDepartamento" class="swal2-select">
            <option value="1" ${registroSeleccionado.disponibilidadDepartamento === 1 ? 'selected' : ''}>Si</option>
            <option value="0" ${registroSeleccionado.disponibilidadDepartamento === 0 ? 'selected' : ''}>No</option>
          </select>
          <br>
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

          // Validaciones
          const nombreRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
          const descripcionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
          const direccionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
          const serviciosRegex = /^[a-zA-Z0-9\s,.-]+$/;
          const contratoRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
  
          if (!nombreDepartamento || !nombreRegex.test(nombreDepartamento)) {
            Swal.showValidationMessage("El nombre no debe contener números ni caracteres especiales.");
            return false;
          }

          if (!direccionDepartamento || !direccionRegex.test(direccionDepartamento)) {
            Swal.showValidationMessage("La dirección no debe contener caracteres especiales.");
            return false;
          }

          if (!descripcionDepartamento || !descripcionRegex.test(descripcionDepartamento)) {
            Swal.showValidationMessage("La descripción esta incompleta!.");
            return false;
          }

          if (!serviciosIncluidos || !serviciosRegex.test(serviciosIncluidos)) {
            Swal.showValidationMessage("Los servicios no debe contener caracteres especiales.");
            return false;
          }

          if (!contratoDescripcion || !contratoRegex.test(contratoDescripcion)) {
            Swal.showValidationMessage("El contrato no debe contener caracteres especiales.");
            return false;
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
