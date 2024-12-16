import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_CLIENTES, URL_OBRAS_EDITAR } from '../../../../Constants/endpoints-API';

const EditarObra = ({ onObraEditado }) => {
    const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
    const [clientes, setClientes] = useState([]);


    const getClientes = async () => {
      try {
        const response = await axios.get(URL_CLIENTES, { headers: { Authorization: `Bearer ${token}` } });
        setClientes(response.data);
      } catch (error) {
        console.error('Error al obtener Clientes:', error);
      }
    };
  
    const handleEditarObra = () => {
      Swal.fire({
        title: 'Editar Obra',
        html: `
            <label><b>Nombre Obra</b></label> 
            <br>
            <input id="nombreObra" class="swal2-input" value="${registroSeleccionado.nombreObra}" />
            <br>
            <br>
            <label><b>Direccion Obra</b></label> 
            <br>
            <input id="direccionObra" class="swal2-input" value="${registroSeleccionado.direccionObra}" />
            <br>
            <br>
            <label><b>Descripcion Obra</b></label> 
            <br>
            <input id="descripcionObra" class="swal2-input" value="${registroSeleccionado.descripcionObra}" />
            <br>
            <br>
            <label><b>Fecha Inicio</b></label> 
            <br>
            <input id="fechainicioObra" class="swal2-input" type="date" value="${registroSeleccionado.fechainicioObra}" />
            <br>
            <br>
            <label><b>Fecha Fin</b></label> 
            <br>
            <input id="fechafinObra" class="swal2-input" type="date" value="${registroSeleccionado.fechafinObra}" />
            <br>
            <br>
            <label><b>Precio Obra</b></label> 
            <br>
            <input id="precioObra" class="swal2-input" type="number" min="0" max="100" value="${registroSeleccionado.precioObra}" />
            <br>
            <br>
            <label><b>Sector Obra</b></label> 
            <br>
            <select id="sectorObra" class="swal2-select">
              <option value="0" ${registroSeleccionado.sectorObra === '0' ? 'selected' : ''}>Privado</option>
              <option value="1" ${registroSeleccionado.sectorObra === '1' ? 'selected' : ''}>Publico</option>
           </select>
            <br>
            <br>
            <label><b>Progreso Obra</b></label> 
            <br>
             <input id="progresoObra" class="swal2-input" type="number" min="0" max="100" value="${registroSeleccionado.progresoObra}" />
            <br>
            <br>
            <label><b>Cliente</b></label> 
            <br>
             <select id="id_cliente" class="swal2-select">
          ${clientes
            .map(
              (cliente) =>
                `<option value="${cliente.id_cliente}" ${
                  cliente.id_cliente === registroSeleccionado.id_cliente ? 'selected' : ''
                }>${cliente.nombreCliente} ${cliente.apellidoCliente}</option>`
            )
            .join('')}
        </select>

        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
          const nombreObra = document.getElementById('nombreObra').value;
            const direccionObra = document.getElementById('direccionObra').value;
            const descripcionObra = document.getElementById('descripcionObra').value;
            const fechainicioObra = document.getElementById('fechainicioObra').value;
            const fechafinObra = document.getElementById('fechafinObra').value;
            const precioObra = document.getElementById('precioObra').value;
            const sectorObra = document.getElementById('sectorObra').value;
            const progresoObra = document.getElementById('progresoObra').value;
            const id_cliente = document.getElementById('id_cliente').value;

  
          // Validaciones
            const nombreRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const direccionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const descripcionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const fechaInicioRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const fechaFinRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const precioRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const sectorRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const progresoRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
            const id_clienteRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;

          if (!nombreObra || !nombreRegex.test(nombreObra)) {
            Swal.showValidationMessage("El nombre no debe contener caracteres especiales.");
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
            if (!fechainicioObra || !fechaInicioRegex.test(fechainicioObra)) {
            Swal.showValidationMessage("La fecha de inicio no debe contener caracteres especiales.");
            return false;
            }
            if (!fechafinObra || !fechaFinRegex.test(fechafinObra)) {
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
            fechainicioObra,
            fechafinObra,
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
      getClientes();
    }, [registroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default EditarObra
