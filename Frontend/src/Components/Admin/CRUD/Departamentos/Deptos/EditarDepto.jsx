import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../../Context/useAuthStore';
import useDeptoStore from '../../../../../Context/useDeptoStore';
import { URL_DEPARTAMENTOS_EDITAR } from '../../../../../Constants/endpoints-API';

const EditarDepto = ({ onDeptoEditado }) => {
    const { deptoSeleccionado, clearDeptoSeleccionado } = useDeptoStore();
    const token = useAuthStore((state) => state.token);
  
    const handleEditarDepto = () => {
      Swal.fire({
        title: 'Editar Departamento',
        html: `
          <input id="nombreDepartamento" class="swal2-input" value="${deptoSeleccionado.nombreDepartamento}" />
          
          <input id="direccionDepartamento" class="swal2-input" value="${deptoSeleccionado.direccionDepartamento}" />
          
          <input id="descripcionDepartamento" class="swal2-input" value="${deptoSeleccionado.descripcionDepartamento}" />
          
          <input id="precioDepartamento" class="swal2-input" value="${deptoSeleccionado.precioDepartamento}" />

          <input id="precioExpensa" class="swal2-input" value="${deptoSeleccionado.precioExpensa}" />

          <input id="serviciosIncluidos" class="swal2-input" value="${deptoSeleccionado.serviciosIncluidos}" />

          <input id="contratoDescripcion" class="swal2-input" value="${deptoSeleccionado.contratoDescripcion}" />

          <input id="disponibilidadDepartamento" class="swal2-input" value="${deptoSeleccionado.disponibilidadDepartamento}" />
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
            await axios.put(`${URL_DEPARTAMENTOS_EDITAR}${deptoSeleccionado.id_departamento}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El departamento fue actualizado correctamente.', 'success');
            onDeptoEditado(); 
            clearDeptoSeleccionado(); 
          } catch (error) {
            console.error('Error al actualizar departamento:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el departamento.', 'error');
          }
        } else {
            clearDeptoSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (deptoSeleccionado) {
        handleEditarDepto();
      }
    }, [deptoSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditarDepto
