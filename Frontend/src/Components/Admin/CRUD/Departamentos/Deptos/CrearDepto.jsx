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
          
          <input id="precioDepartamento" type="number" min="0" placeholder="Precio Departamento" class="swal2-input" />

          <input id="precioExpensa" type="number" min="0" placeholder="Precio Expensa" class="swal2-input" />

            <br/>
            <br/>
            <label><strong>Servicios Incluidos:</strong></label>
            <br/>           
            <select id="serviciosIncluidos" class="swal2-select">
            <option value="1">Si</option>
            <option value="0">No</option>
           </select>

          <input id="contratoDescripcion" placeholder="Detalles de Contrato" class="swal2-input" />

            <br/>
            <br/>
            <label><strong>Selecciona la disponibilidad:</strong></label>
            <br/>
          <select id="disponibilidadDepartamento" class="swal2-select">
            <option value="1">Si</option>
            <option value="0">No</option>
          </select>
          <br/>
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

          // Validaciones
          const nombreRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
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
            await axios.post(URL_DEPARTAMENTOS_CREAR, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'El vehículo fue registrado correctamente.', 'success');
            onDeptoRegistrado(); 
            closeRegistroModal(); 
          } catch (error) {
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
