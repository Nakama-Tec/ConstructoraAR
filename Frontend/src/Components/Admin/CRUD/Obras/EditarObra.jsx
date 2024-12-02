import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_OBRAS_EDITAR } from '../../../../Constants/endpoints-API';

const EditarObra = ({ onObraEditado }) => {
    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const handleEditarObra = () => {
      Swal.fire({
        title: 'Editar Obra',
        html: `
            <input id="nombreCliente" class="swal2-input" value="${registroSeleccionado.nombreObra}" />
  
            <input id="direccionObra" class="swal2-input" value="${registroSeleccionado.direccionObra}" />

            <input id="descripcionObra" class="swal2-input" value="${registroSeleccionado.descripcionObra}" />

            <input id="fechaInicioObra" class="swal2-input" value="${registroSeleccionado.fechaInicioObra}" />

            <input id="fechaFinObra" class="swal2-input" value="${registroSeleccionado.fechaFinObra}" />

            <input id="precioObra" class="swal2-input" value="${registroSeleccionado.precioObra}" />

            <input id="sectorObra" class="swal2-input" value="${registroSeleccionado.sectorObra}" />

             <input id="progresoObra" class="swal2-input" value="${registroSeleccionado.progresoObra}" />

            <input id="id_cliente" class="swal2-input" value="${registroSeleccionado.id_cliente}" />

        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const nombreObra = document.getElementById('nombreObra').value;
            const direccionObra = document.getElementById('direccionObra').value;
            const descripcionObra = document.getElementById('descripcionObra').value;
            const fechaInicioObra = document.getElementById('fechaInicioObra').value;
            const fechaFinObra = document.getElementById('fechaFinObra').value;
            const precioObra = document.getElementById('precioObra').value;
            const sectorObra = document.getElementById('sectorObra').value;
            const progresoObra = document.getElementById('progresoObra').value;
            const id_cliente = document.getElementById('id_cliente').value;

  
          // Validaciones
            const nombreRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
            const direccionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const descripcionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const fechaInicioRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const fechaFinRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const precioRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const sectorRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const progresoRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const id_clienteRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;

          if (!nombreObra || !nombreRegex.test(nombreObra)) {
            Swal.showValidationMessage("El nombre no debe contener números.");
            return false;
          }
            if (!direccionObra || !direccionRegex.test(direccionObra)) {
            Swal.showValidationMessage("La dirección no debe contener caracteres especiales.");
            return false;   
            }
            if (!descripcionObra || !descripcionRegex.test(descripcionObra)) {
            Swal.showValidationMessage("La descripción no debe contener caracteres especiales.");
            return false;
            }
            if (!fechaInicioObra || !fechaInicioRegex.test(fechaInicioObra)) {
            Swal.showValidationMessage("La fecha de inicio no debe contener caracteres especiales.");
            return false;
            }
            if (!fechaFinObra || !fechaFinRegex.test(fechaFinObra)) {
            Swal.showValidationMessage("La fecha de fin no debe contener caracteres especiales.");
            return false;
            }
            if (!precioObra || !precioRegex.test(precioObra)) {
            Swal.showValidationMessage("El precio no debe contener caracteres especiales.");
            return false;
            }
            if (!sectorObra || !sectorRegex.test(sectorObra)) {
            Swal.showValidationMessage("El sector no debe contener caracteres especiales.");
            return false;
            }
            if (!progresoObra || !progresoRegex.test(progresoObra)) {
            Swal.showValidationMessage("El progreso no debe contener caracteres especiales.");
            return false;
            }
            if (!id_cliente || !id_clienteRegex.test(id_cliente)) {
            Swal.showValidationMessage("El id del cliente no debe contener caracteres especiales.");
            return false;
            }
              
          return {
            nombreObra,
            direccionObra,
            descripcionObra,
            fechaInicioObra,
            fechaFinObra,
            precioObra,
            sectorObra,
            progresoObra,
            id_cliente

          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`${URL_OBRAS_EDITAR}${registroSeleccionado.id_obra}`, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'La obra fue actualizado correctamente.', 'success');
            onObraEditado(); 
            clearRegistroSeleccionado(); 
          } catch (error) {
            Swal.fire('Error', 'Hubo un problema al actualizar la Obra.', 'error');
          }
        } else {
          clearRegistroSeleccionado(); 
        }
      });
    };
  
    useEffect(() => {
      if (registroSeleccionado) {
        handleEditarObra();
      }
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditarObra
