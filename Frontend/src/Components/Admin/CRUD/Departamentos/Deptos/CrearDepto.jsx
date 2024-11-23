import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../../Context/useAuthStore';
import useRegistroStore from '../../../../../Context/useRegistroStore';
import { URL_DEPARTAMENTOS_CREAR } from '../../../../../Constants/endpoints-API';

const CrearDepto = ({ onDeptoRegistrado }) => {

    const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleRegistrarDepto = () => {
      Swal.fire({
        title: 'Registrar Departamento',
        html: `
          <input id="nombreDepartamento" placeholder="Nombre Departamento" class="swal2-input" />
          
          <input id="direccionDepartamento" placeholder="Dirección" class="swal2-input" />
          
          <input id="descripcionDepartamento" placeholder="Descripción" class="swal2-input" />
          
          <input id="precioDepartamento" placeholder="Precio Departamento" class="swal2-input" />

          <input id="precioExpensa" placeholder="Precio Expensa" class="swal2-input" />

          <input id="serviciosIncluidos" placeholder="Servicios incluidos" class="swal2-input" />

          <input id="contratoDescripcion" placeholder="Detalles de Contrato" class="swal2-input" />

          <input id="disponibilidadDepartamento" placeholder="Disponibilidad" class="swal2-input" />
        `,
        confirmButtonText: 'Registrar',
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
            await axios.post(URL_DEPARTAMENTOS_CREAR, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El vehículo fue registrado correctamente.', 'success');
            onDeptoRegistrado(); 
            closeRegistroModal(); 
          } catch (error) {
            console.error('Error al registrar vehículo:', error);
            Swal.fire('Error', 'Hubo un problema al registrar el vehículo.', 'error');
          }
        } else {
          closeRegistroModal(); 
        }
      });
    };
  
useEffect(() => {
      if (isRegistroModalOpen) {
        handleRegistrarDepto();
      }
    }, [isRegistroModalOpen]);
  
    return null; // No renderiza nada directamente
  };

export default CrearDepto
