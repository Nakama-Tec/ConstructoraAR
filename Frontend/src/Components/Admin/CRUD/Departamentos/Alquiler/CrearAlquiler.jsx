import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../../Context/useAuthStore';
import useRegistroStore from '../../../../../Context/useRegistroStore';
import { URL_ALQUILERES_CREAR, URL_DEPARTAMENTOS, URL_CLIENTES } from '../../../../../Constants/endpoints-API';


const CrearAlquiler = ({ onAlquilerRegistrado }) => {
    const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
    const token = useAuthStore((state) => state.token);

    const [departamentos, setDepartamentos] = useState([]);
    const [clientes, setClientes] = useState([]);

    const getDepartamentos = async () => {
        try {
          const response = await axios.get(URL_DEPARTAMENTOS, { headers: { Authorization: `Bearer ${token}` } });
          setDepartamentos(response.data);
        } catch (error) {
          console.error('Error al obtener departamentos:', error);
        }
      };

      const getClientes = async () => {
        try {
          const response = await axios.get(URL_CLIENTES, { headers: { Authorization: `Bearer ${token}` } });
          setClientes(response.data);
        } catch (error) {
          console.error('Error al obtener clientes:', error);
        }
      };
  
    const handleRegistrarAlquiler = () => {
    Swal.fire({
      title: 'Registrar Alquiler',
      html: `
        <label for="fechaInicioAlquiler"><b>Fecha Inicio</b></label>
        <br> 
        <input id="fechaInicioAlquiler" class="swal2-input" type="date"/>
        <br>
        <br>
        <label for="fechaFinAlquiler"><b>Fecha Fin</b></label>
        <br>
        <input id="fechaFinAlquiler" class="swal2-input" type="date"/>
        <br>
        <br>
        <label for="select_departamento"><b>Nombre Departamento</b></label>
        <br>
        <select id="select_departamento" class="swal2-select">
        ${departamentos
        .map(
          (departamento) =>
            `<option value="${departamento.id_departamento}" ${
            departamento.id === departamento.id_departamento ? 'selected' : ''
            }>${departamento.nombreDepartamento}</option>`
        )
        
        .join('')}
      </select>

        <br>
        <br>
        <label for="select_cliente"><b>Nombre Cliente</b></label>
        <br>
        <select id="select_cliente" class="swal2-select">
        ${clientes
        .map(
          (cliente) =>
            `<option value="${cliente.id_cliente}" ${
            cliente.id === cliente.id_cliente ? 'selected' : ''
            }>${cliente.nombreCliente} ${cliente.apellidoCliente}</option>`
        )
        .join('')}
      </select>
      
      `,
      
      confirmButtonText: 'Registrar',
      showCancelButton: true,
      preConfirm: () => {
        const fechaInicioAlquiler = document.getElementById('fechaInicioAlquiler').value;
        const fechaFinAlquiler = document.getElementById('fechaFinAlquiler').value;
        const id_departamento = document.getElementById('select_departamento').value;
        const id_cliente = document.getElementById('select_cliente').value;
  
        if (!fechaInicioAlquiler || !fechaFinAlquiler || !id_departamento || !id_cliente) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
        }
  
        return {
        fechaInicioAlquiler,
        fechaFinAlquiler,
        id_departamento,
        id_cliente
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
        await axios.post(URL_ALQUILERES_CREAR, result.value, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('¡Éxito!', 'El alquiler fue registrado correctamente.', 'success');
        onAlquilerRegistrado(); 
        closeRegistroModal(); 

        } catch (error) {
        console.error('Error al registrar alquiler:', error);
        Swal.fire('Error', 'Hubo un problema al registrar el alquiler.', 'error');
        
        }
      } else {
        closeRegistroModal(); 
      }
    });
    };
  
useEffect(() => {
      if (isRegistroModalOpen) {
        handleRegistrarAlquiler();
      }
      getDepartamentos();
      getClientes();
    }, [isRegistroModalOpen]);
  
    return null; // No renderiza nada directamente
  };

export default CrearAlquiler;